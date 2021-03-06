import { PrivacyComponent } from './components/privacy/privacy.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { FeatureJobComponent } from './components/feature-job/feature-job.component';
import { LandingJobDetailComponent } from './components/landing-job-detail/landing-job-detail.component';
import { LandingJobListComponent } from './components/landing-job-list/landing-job-list.component';
import { LandingNearJobsComponent } from './components/landing-near-jobs/landing-near-jobs.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LandingComponent } from './landing.component';
import { SimpleJobSearchResolveService } from '@app/_resolvers/simple-job-search-resolve.service';
import { JobDetailResolverService } from '@app/_resolvers/job-detail-resolver.service';
import { FeatureJobListComponent } from './components/feature-job-list/feature-job-list.component';
import { TermsComponent } from './components/terms/terms.component';
import { LandingGuard } from './_helpers/landing.guard';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { 
        path: 'home', 
        component: HomeComponent 
      },
      { 
        path: 'jobs/near', 
        component: LandingNearJobsComponent 
      },
      {
        path: 'jobs/details/:id',
        canActivate: [LandingGuard],
        component: LandingJobDetailComponent,
        resolve: { data: JobDetailResolverService }
      },
      {
        path: 'search/jobs',
        canActivate: [LandingGuard],
        component: LandingJobListComponent,
        resolve: { jsRes: SimpleJobSearchResolveService }
      },
      {
        path: 'search/jobs/details/:id',
        canActivate: [LandingGuard],
        component: LandingJobDetailComponent,
        resolve: { data: JobDetailResolverService }
      },
      {
        path: 'featured/jobs',
        canActivate: [LandingGuard],
        component: FeatureJobListComponent,
        resolve: { data: SimpleJobSearchResolveService }
      },
      {
        path: 'about',
        component: AboutusComponent
      },
      {
        path: 'privacy',
        component: PrivacyComponent
      },
      {
        path: 'legal',
        component: TermsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule {}
