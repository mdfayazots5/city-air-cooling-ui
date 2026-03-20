import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { ApiService } from './api.service';
import { MasterDataBundle, MasterDataCollection, MasterDataItem } from '../models';

const EMPTY_MASTER_BUNDLE: MasterDataBundle = {
  generatedAtUtc: '',
  masters: {}
};

@Injectable({
  providedIn: 'root'
})
export class MasterDataService {
  private readonly bundleSubject = new BehaviorSubject<MasterDataBundle>(EMPTY_MASTER_BUNDLE);
  private loadAllPromise: Promise<MasterDataBundle> | null = null;
  readonly bundle$ = this.bundleSubject.asObservable();

  constructor(private readonly apiService: ApiService) {}

  async loadAll(): Promise<MasterDataBundle> {
    if (this.loadAllPromise) {
      return this.loadAllPromise;
    }

    this.loadAllPromise = (async () => {
      try {
        const bundle = await firstValueFrom(this.apiService.getAllMasters());
        const normalizedBundle = this.normalizeBundle(bundle);
        this.bundleSubject.next(normalizedBundle);
        return normalizedBundle;
      } finally {
        this.loadAllPromise = null;
      }
    })();

    return this.loadAllPromise;
  }

  getSnapshot(): MasterDataBundle {
    return this.bundleSubject.value;
  }

  async refreshType(type: string): Promise<MasterDataCollection> {
    const collection = await firstValueFrom(this.apiService.getMasters(type));
    const normalizedCollection = this.normalizeCollection(collection);
    const resolvedMasterType = normalizedCollection.masterType || type;
    const currentBundle = this.getSnapshot();

    this.bundleSubject.next({
      generatedAtUtc: normalizedCollection.generatedAtUtc,
      masters: {
        ...currentBundle.masters,
        [resolvedMasterType]: normalizedCollection.items
      }
    });

    return {
      ...normalizedCollection,
      masterType: resolvedMasterType
    };
  }

  getByType(type: string): MasterDataItem[] {
    return this.bundleSubject.value.masters[type] ?? [];
  }

  getServiceAreas(): MasterDataItem[] {
    return this.getByType('ServiceAreas');
  }

  getBrands(): MasterDataItem[] {
    return this.getByType('Brands');
  }

  getServices(): MasterDataItem[] {
    return this.getByType('Services');
  }

  getFaqs(): MasterDataItem[] {
    return this.getByType('Faqs');
  }

  getSocialLinks(): MasterDataItem[] {
    return this.getByType('SocialLinks');
  }

  getWorkingHours(): MasterDataItem[] {
    return this.getByType('WorkingHours');
  }

  private normalizeBundle(bundle: MasterDataBundle | null | undefined): MasterDataBundle {
    if (!bundle) {
      return EMPTY_MASTER_BUNDLE;
    }

    const masters = Object.entries(bundle.masters ?? {}).reduce<Record<string, MasterDataItem[]>>(
      (accumulator, [key, value]) => {
        accumulator[key] = (value ?? []).map(item => this.normalizeItem(item));
        return accumulator;
      },
      {}
    );

    return {
      generatedAtUtc: bundle.generatedAtUtc ?? '',
      masters
    };
  }

  private normalizeCollection(collection: MasterDataCollection | null | undefined): MasterDataCollection {
    return {
      masterType: collection?.masterType ?? '',
      generatedAtUtc: collection?.generatedAtUtc ?? '',
      items: (collection?.items ?? []).map(item => this.normalizeItem(item))
    };
  }

  private normalizeItem(item: MasterDataItem): MasterDataItem {
    return {
      ...item,
      attributes: item?.attributes ?? {}
    };
  }
}
