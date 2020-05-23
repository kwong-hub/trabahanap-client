import { AdsadminComponent } from './adsadmin.component';
import { AdsadminGuard } from './_helpers/adsadmin.guard';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

import { AdvertisementListComponent } from './components/advertisement-list/advertisement-list.component';
import { AddAdvertisementComponent } from './components/add-advertisement/add-advertisement.component';
import { AdsListResolverService } from '@app/_resolvers/admin-resolvers/ads-list-resolver.service';
import { ChangePasswordComponent } from '@app/shared/components/change-password/change-password.component';
import { AdvertisementEditComponent } from './components/advertisement-edit/advertisement-edit.component';
import { FetchAdByIdResolverService } from '@app/_resolvers/admin-resolvers/fetch-ad-by-id-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: AdsadminComponent,
    children: [
      {
        path: 'home',
        canActivate: [AdsadminGuard],
        component: HomeComponent
      },
      {
        path: 'ads',
        canActivate: [AdsadminGuard],
        component: AdvertisementListComponent,
        resolve: { data: AdsListResolverService }
      },
      {
        path: 'ads/edit/:id',
        canActivate: [AdsadminGuard],
        component: AdvertisementEditComponent,
        resolve: { data: FetchAdByIdResolverService}
      },
      {
        path: 'ads/add',
        canActivate: [AdsadminGuard],
        component: AddAdvertisementComponent
      },
      {
        path: 'password',
        canActivate: [AdsadminGuard],
        component: ChangePasswordComponent
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdsadminRoutingModule {}
