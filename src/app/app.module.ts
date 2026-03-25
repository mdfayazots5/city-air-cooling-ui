import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { LayoutModule } from './layouts/layout.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { CookieBannerComponent } from './shared/components/cookie-banner/cookie-banner.component';
import { ConfigService } from './core/services/config.service';

export function initializeApp(configService: ConfigService): () => Promise<void> {
  return () => configService.loadConfig();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CoreModule,
    LayoutModule,
    SharedModule,
    // provide standalone components used by AppComponent
    // e.g., cookie banner is standalone
    // (keeps AppComponent non-standalone while using standalone child components)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: imported for Angular compiler
    CookieBannerComponent
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [ConfigService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

