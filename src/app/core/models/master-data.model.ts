export interface MasterDataItem {
  id: string;
  code: string;
  name: string;
  title?: string | null;
  description?: string | null;
  isActive: boolean;
  isPublic?: boolean;
  displayOrder: number;
  iconUrl?: string | null;
  imageUrl?: string | null;
  url?: string | null;
  key?: string | null;
  value?: string | null;
  attributes: Record<string, string | null>;
}

export interface MasterDataCollection {
  masterType: string;
  generatedAtUtc: string;
  items: MasterDataItem[];
}

export interface MasterDataBundle {
  generatedAtUtc: string;
  masters: Record<string, MasterDataItem[]>;
}
