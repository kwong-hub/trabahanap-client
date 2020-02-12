import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {  BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationService } from './_services/authentication-service.service';
import { JwtInterceptor } from './_helpers/jwt.intercepter';
import { CustomPreloadingService } from './_services/custom-preloading.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, BrowserAnimationsModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    {
      provide: APP_BASE_HREF,
      useValue: '/'
    },
    AuthenticationService,
    CustomPreloadingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
