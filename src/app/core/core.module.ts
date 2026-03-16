import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ConfigService } from './services/config.service';
import { ApiService } from './services/api.service';
import { EventTrackingService } from './services/event-tracking.service';
import { LocationService } from './services/location.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    ConfigService,
    ApiService,
    EventTrackingService,
    LocationService
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only.');
    }
  }
}

