import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdsadminComponent } from './adsadmin.component';
import { AddAdvertisementComponent } from './components/add-advertisement/add-advertisement.component';
import { AdvertisementListComponent } from './components/advertisement-list/advertisement-list.component';

import { AuthenticationService } from '@app/_services/authentication-service.service';
import { AdsListResolverService } from '@app/_resolvers/admin-resolvers/ads-list-resolver.service';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '@app/shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  MatProgressBarModule,
  MatTableModule,
  MatPaginatorModule,
  MatButtonModule,
  MatMenuModule,
  MatExpansionModule
} from '@angular/material';
import { JwtInterceptor } from '@app/_helpers/jwt.intercepter';
import { ErrorInterceptor } from '@app/_helpers/error.intercepter';
import { AdsadminRoutingModule } from './adsadmin-routing.module';

@NgModule({
  declarations: [
    AdsadminComponent,
    HomeComponent,
    HeaderComponent,
    AddAdvertisementComponent,
    AdvertisementListComponent
  ],
  imports: [
    AdsadminRoutingModule,
    SharedModule,
    MatProgressBarModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatMenuModule,
    MatExpansionModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AuthenticationService,
    AdsListResolverService
  ]
})
export class AdsadminModule {}
