// import { SubscriptionResolverService } from './../_resolvers/employer-resolvers/subscription-resolver.service';
import { IndustryAndLocationResolverService } from '../_services/industry-and-location-resolver.service';
import { CandidateApplicantDetailComponent } from './components/candidate-applicant-detail/candidate-applicant-detail.component';
import { JobCandidatesComponent } from './components/job-candidates/job-candidates.component';
import { AddJobComponent } from './components/add-job/add-job.component';
import { EmployerGuard } from './_helpers/employer.guard';
import { EmployerOnlyGuard } from './_helpers/employer-only.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { JobsComponent } from './components/jobs/jobs.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployerComponent } from './employer.component';
import { HomeComponent } from './components/home/home.component';
import { CandidatesComponent } from './components/candidates/candidates.component';
import { LocationsComponent } from './components/locations/locations.component';
import { StaffsComponent } from './components/staffs/staffs.component';
// import { SubscriptionsComponent } from './components/subscriptions/subscriptions.component';
import { AddLocationComponent } from './components/add-location/add-location.component';
import { LocationDetailComponent } from './components/location-detail/location-detail.component';
import { ChangePasswordComponent } from '@app/shared/components/change-password/change-password.component';
import { FilteredCandidatesComponent } from './components/filtered-candidates/filtered-candidates.component';
import { FilteredJobCandidatesComponent } from './components/filtered-job-candidates/filtered-job-candidates.component';
import { FilteredCandidateApplicantDetailComponent } from './components/filtered-candidate-applicant-detail/filtered-candidate-applicant-detail.component';
import { IssueListComponent } from './components/issue-list/issue-list.component';
import { EmployerDashboardResolverService } from '@app/_resolvers/employer-dashboard-resolver.service';
import { ApplicationsListComponent } from './components/applications-list/applications-list.component';
import { IssueDetailsComponent } from '@app/shared/components/issue-details/issue-details.component';
import { IssueDetailResolverService } from '@app/_resolvers/employer-resolvers/issue-detail-resolver.service';
import { CompanyProfileResolverService } from '@app/_resolvers/employer-resolvers/company-profile-resolver.service';
import { CompanyJobsResolverService } from '@app/_resolvers/employer-resolvers/company-jobs-resolver.service';
import { CompanyCandidatesResolverService } from '@app/_resolvers/employer-resolvers/company-candidates-resolver.service';
import { FilteredCandidatesResolverService } from '@app/_resolvers/employer-resolvers/filtered-candidates-resolver.service';
import { CompanyApplicationsResolverService } from '@app/_resolvers/employer-resolvers/company-applications-resolver.service';
import { CompanyLocationResolverService } from '@app/_resolvers/employer-resolvers/company-location-resolver.service';
import { CompanyStaffResolverService } from '@app/_resolvers/employer-resolvers/company-staff-resolver.service';
import { LocationDetailResolverService } from '@app/_resolvers/employer-resolvers/location-detail-resolver.service';
import { HeadLocationCheckResolverService } from '@app/_resolvers/employer-resolvers/head-location-check-resolver.service';
import { ApplicantDetailResolverService } from '@app/_resolvers/employer-resolvers/applicant-detail-resolver.service';
import { SubscriptionsComponent } from './components/subscriptions/subscriptions.component';
import { SubscriptionResolverService } from '@app/_resolvers/employer-resolvers/subscription-resolver.service';
import { PaymentTypeResolverService } from '@app/_resolvers/employer-resolvers/payment-type-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: EmployerComponent,
    children: [
      {
        path: 'home',
        canActivate: [EmployerGuard],
        component: HomeComponent,
        data: { name: 'home' },
        resolve: { dashRes: EmployerDashboardResolverService }
      },
      {
        path: '',
        canActivate: [EmployerGuard],
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'jobs',
        canActivate: [EmployerGuard],
        component: JobsComponent,
        data: { name: 'jobs' },
        resolve: {
          company: CompanyProfileResolverService,
          jobs: CompanyJobsResolverService
        }
      },
      {
        path: 'applications',
        canActivate: [EmployerGuard],
        component: ApplicationsListComponent,
        data: { name: 'jobs' },
        resolve: { data: CompanyApplicationsResolverService }
      },
      {
        path: 'candidates',
        canActivate: [EmployerGuard],
        component: CandidatesComponent,
        data: { name: 'candidates' },
        resolve: { candidates: CompanyCandidatesResolverService }
      },
      {
        path: 'filtered_candidates',
        canActivate: [EmployerGuard],
        component: FilteredCandidatesComponent,
        data: { name: 'filtered_candidates' },
        resolve: { filters: FilteredCandidatesResolverService }
      },
      {
        path: 'filtered_candidates/job/:id',
        canActivate: [EmployerGuard],
        component: FilteredJobCandidatesComponent,
        data: { name: 'View Filtered Job Applicants' }
      },
      {
        path: 'candidates/job/:id',
        canActivate: [EmployerGuard],
        component: JobCandidatesComponent,
        data: { name: 'View Job Applicants' }
      },
      {
        path: 'candidates/job/:jobId/applicant/:applicantId',
        canActivate: [EmployerGuard],
        component: CandidateApplicantDetailComponent,
        data: { name: 'View Applicant Detail' },
        resolve: { subs: ApplicantDetailResolverService }
      },
      {
        path: 'filtered_candidates/job/:jobId/applicant/:applicantId',
        canActivate: [EmployerGuard],
        component: FilteredCandidateApplicantDetailComponent,
        data: { name: 'View Filtered Applicant Detail' },
        resolve: { subs: ApplicantDetailResolverService }
      },
      {
        path: 'branches',
        canActivate: [EmployerGuard],
        component: LocationsComponent,
        data: { name: 'company branches' },
        resolve: { data: CompanyLocationResolverService }
      },
      {
        path: 'staff',
        canActivate: [EmployerOnlyGuard],
        component: StaffsComponent,
        data: { name: 'staff' },
        resolve: { data: CompanyStaffResolverService }
      },
      {
        path: 'profile',
        canActivate: [EmployerGuard],
        component: ProfileComponent,
        data: { name: 'company profile' },
        resolve: { data: CompanyProfileResolverService }
      },
      {
        path: 'issues',
        canActivate: [EmployerGuard],
        component: IssueListComponent,
        data: { name: 'Report Issue' }
      },
      {
        path: 'issues/details/:id',
        canActivate: [EmployerGuard],
        component: IssueDetailsComponent,
        resolve: { data: IssueDetailResolverService }
      },
      {
        path: 'plan',
        canActivate: [EmployerGuard],
        component: SubscriptionsComponent,
        data: { name: 'subscription plan' },
        resolve: { data: SubscriptionResolverService, planTypes: PaymentTypeResolverService }
      },
      {
        path: 'password',
        canActivate: [EmployerGuard],
        component: ChangePasswordComponent,
        data: { name: 'Change password' }
      },
      {
        path: 'jobs/add',
        canActivate: [EmployerGuard],
        component: AddJobComponent,
        resolve: { data: IndustryAndLocationResolverService }
      },
      {
        path: 'jobs/:id',
        canActivate: [EmployerGuard],
        component: AddJobComponent,
        resolve: { data: IndustryAndLocationResolverService }
      },
      {
        path: 'branches/add',
        canActivate: [EmployerGuard],
        component: AddLocationComponent,
        data: { name: 'Add Location' },
        resolve: { data: HeadLocationCheckResolverService }
      },
      {
        path: 'branches/:id',
        canActivate: [EmployerGuard],
        component: LocationDetailComponent,
        data: { name: 'Edit Location Detail' },
        resolve: { data: LocationDetailResolverService }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployerRoutingModule {}
