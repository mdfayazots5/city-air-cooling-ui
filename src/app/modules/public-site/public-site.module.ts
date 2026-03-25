import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

import { HomeComponent } from './home/home.component';
import { HomeMobileComponent } from './home/home.mobile.component';
import { ServicesComponent } from './services/services.component';
import { ServiceCardMobilePublicComponent } from './services/service-card.mobile.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { FaqComponent } from './faq/faq.component';
import { ServiceAreasComponent } from './service-areas/service-areas.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'about', component: AboutComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'service-areas', component: ServiceAreasComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    HomeComponent,
    HomeMobileComponent,
    ServicesComponent,
    ServiceCardMobilePublicComponent,
    ContactComponent,
    AboutComponent,
    FaqComponent,
    ServiceAreasComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class PublicSiteModule { }

