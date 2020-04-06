import { EmployerPlanComponent } from './components/employer-plan/employer-plan.component';
import { EditPlanTypeComponent } from './components/edit-plan-type/edit-plan-type.component';
import { AddPlanTypeComponent } from './components/add-plan-type/add-plan-type.component';
import { FeaturedCompaniesComponent } from './components/featured-companies/featured-companies.component';
import { AddEmployerJobComponent } from './components/add-employer-job/add-employer-job.component';
import { CountryRegionIndustryResolverService } from './../_resolvers/country-region-industry-resolver.service';
import { AddEmployerComponent } from './components/add-employer/add-employer.component';
import { AdminGuard } from './_helpers/admin.guard';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './admin.component';
import { IssuesComponent } from './components/issues/issues.component';
import { CompanyListComponent } from './components/company-list/company-list.component';
import { ApplicantListComponent } from './components/applicant-list/applicant-list.component';
import { AddApplicantComponent } from './components/add-applicant/add-applicant.component';
import { AddJobsComponent } from './components/add-jobs/add-jobs.component';
import { JobsListComponent } from './components/jobs-list/jobs-list.component';
import { CompanyLocationsComponent } from './components/company-locations/company-locations.component';
import { AddLocationComponent } from './components/add-location/add-location.component';
import { IndustryAndLocationResolverService } from '@app/_services/industry-and-location-resolver.service';
import { StaffListComponent } from './components/staff-list/staff-list.component';
import { AddStaffComponent } from './components/add-staff/add-staff.component';
import { AllJobsComponent } from './components/all-jobs/all-jobs.component';
import { CompanyDetailComponent } from './components/company-detail/company-detail.component';
import { IssueListApplicantComponent } from './components/issue-list-applicant/issue-list-applicant.component';
import { IssueListEmployerComponent } from './components/issue-list-employer/issue-list-employer.component';
import { AdminStaffListComponent } from './components/admin-staff-list/admin-staff-list.component';
import { ApplicationsListComponent } from './components/applications-list/applications-list.component';
import { SuperAdminGuard } from './_helpers/super-admin.guard';
import { AdminDashboardResolverService } from '@app/_resolvers/admin-dashboard-resolver.service';
import { IssueDetailContainerComponent } from './components/issue-detail-container/issue-detail-container.component';
import { IssueByIdResolverService } from '@app/_resolvers/admin-resolvers/issue-by-id-resolver.service';

import { ApplicantDetailComponent } from './components/applicant-detail/applicant-detail.component';
import { CompanyLocationDetailComponent } from './components/company-location-detail/company-location-detail.component';
import { AdminLocationDetailResolverService } from '@app/_resolvers/admin-resolvers/admin-location-detail-resolver.service';
import { ChangePasswordComponent } from '@app/shared/components/change-password/change-password.component';
import { CompanyListResolverService } from '@app/_resolvers/admin-resolvers/company-list-resolver.service';
import { ApplicantListResolverService } from '@app/_resolvers/admin-resolvers/applicant-list-resolver.service';
import { JobListResolverService } from '@app/_resolvers/admin-resolvers/job-list-resolver.service';
import { ApplicationListResolverService } from '@app/_resolvers/admin-resolvers/application-list-resolver.service';
import { AddAdminStaffComponent } from './components/add-admin-staff/add-admin-staff.component';
import { AdminStaffsListResolverService } from '@app/_resolvers/admin-resolvers/admin-staffs-list-resolver.service';
import { ReportJobListComponent } from './components/report-job-list/report-job-list.component';
import { FeaturedCompanyListResolverService } from '@app/_resolvers/admin-resolvers/featured-company-list-resolver.service';
import { ReportJobDetailComponent } from './components/report-job-detail/report-job-detail.component';
import { ReportByIdResolverService } from '@app/_resolvers/admin-resolvers/report-by-id-resolver.service';
import { AdvertisementListComponent } from './components/advertisement-list/advertisement-list.component';
import { AddAdvertisementComponent } from './components/add-advertisement/add-advertisement.component';
import { AdsListResolverService } from '@app/_resolvers/admin-resolvers/ads-list-resolver.service';
import { ApplicantIssueListResolverService } from '@app/_resolvers/admin-resolvers/applicant-issue-list-resolver.service';
import { EmployerIssueListResolverService } from '@app/_resolvers/admin-resolvers/employer-issue-list-resolver.service';
import { AdminIssueDashboardResolverService } from '@app/_resolvers/admin-resolvers/admin-issue-dashboard-resolver.service';
import { AdminCompanyDetailResolverService } from '@app/_resolvers/admin-resolvers/admin-company-detail-resolver.service';
import { AdminReportResolverService } from '@app/_resolvers/admin-resolvers/admin-report-resolver.service';
import { PaymentListComponent } from './components/payment-list/payment-list.component';
import { AdminPaymentListResolverService } from '@app/_resolvers/admin-resolvers/admin-payment-list-resolver.service';
import { PaymentDetailComponent } from './components/payment-detail/payment-detail.component';
import { AdminPaymentDetailResolverService } from '@app/_resolvers/admin-resolvers/admin-payment-detail-resolver.service';
import { AdminEmployerPaymentResolverService } from '@app/_resolvers/admin-resolvers/admin-employer-payment-resolver.service';
import { EmployerPaymentInformationComponent } from './components/employer-payment-information/employer-payment-information.component';
import { PlanTypesComponent } from './components/plan-types/plan-types.component';
import { PaymentTypeResolverService } from '@app/_resolvers/admin-resolvers/payment-type-resolver.service';
import { EditPaymentTypeResolverService } from '@app/_resolvers/admin-resolvers/edit-payment-type-resolver.service';
import { ExemptedCompanyComponent } from './components/exempted-company/exempted-company.component';
import { ExemptResolverService } from '@app/_resolvers/admin-resolvers/exempt-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'home',
        canActivate: [AdminGuard],
        component: HomeComponent,
        resolve: { dashRes: AdminDashboardResolverService },
      },
      {
        path: '',
        canActivate: [AdminGuard],
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'issues',
        canActivate: [AdminGuard],
        component: IssuesComponent,
        resolve: { data: AdminIssueDashboardResolverService },
      },
      {
        path: 'issues/applicant',
        canActivate: [AdminGuard],
        component: IssueListApplicantComponent,
        resolve: { data: ApplicantIssueListResolverService },
      },
      {
        path: 'issues/report',
        canActivate: [AdminGuard],
        component: ReportJobListComponent,
        resolve: { data: AdminReportResolverService },
      },
      {
        path: 'issues/report/detail/:id',
        canActivate: [AdminGuard],
        component: ReportJobDetailComponent,
        resolve: { data: ReportByIdResolverService },
      },
      {
        path: 'issues/applicant/details/:id',
        canActivate: [AdminGuard],
        component: IssueDetailContainerComponent,
        resolve: { data: IssueByIdResolverService },
      },
      {
        path: 'issues/employer',
        canActivate: [AdminGuard],
        component: IssueListEmployerComponent,
        resolve: { data: EmployerIssueListResolverService },
      },
      {
        path: 'issues/employer/details/:id',
        canActivate: [AdminGuard],
        component: IssueDetailContainerComponent,
        resolve: { data: IssueByIdResolverService },
      },
      {
        path: 'jobs',
        canActivate: [AdminGuard],
        component: AllJobsComponent,
      },
      {
        path: 'employers',
        canActivate: [AdminGuard],
        component: CompanyListComponent,
      },
      {
        path: 'staff',
        canActivate: [SuperAdminGuard],
        component: AdminStaffListComponent,
        resolve: { data: AdminStaffsListResolverService },
      },
      {
        path: 'staff/add',
        canActivate: [SuperAdminGuard],
        component: AddAdminStaffComponent,
      },
      {
        path: 'employers/details/:id',
        canActivate: [AdminGuard],
        component: CompanyDetailComponent,
        resolve: { data: AdminCompanyDetailResolverService },
      },
      {
        path: 'employers/add',
        canActivate: [AdminGuard],
        component: AddEmployerComponent,
        resolve: { data: CountryRegionIndustryResolverService },
      },
      {
        path: 'employers/add_job',
        canActivate: [AdminGuard],
        component: AddEmployerJobComponent,
      },
      {
        path: 'employers/jobs/:id/add/:jobId',
        canActivate: [AdminGuard],
        component: AddJobsComponent,
      },
      // { path: 'employers/jobs/:id/add', canActivate: [AdminGuard], component: AddJobsComponent},
      {
        path: 'employers/jobs/:id',
        canActivate: [AdminGuard],
        component: JobsListComponent,
      },
      {
        path: 'employers/locations/:id',
        canActivate: [AdminGuard],
        component: CompanyLocationsComponent,
      },
      {
        path: 'employers/locations/:id/add',
        canActivate: [AdminGuard],
        component: AddLocationComponent,
      },
      {
        path: 'employers/locations/:id/edit/:locationId',
        canActivate: [AdminGuard],
        component: CompanyLocationDetailComponent,
        resolve: {
          location: AdminLocationDetailResolverService,
          helpers: CountryRegionIndustryResolverService,
        },
      },
      {
        path: 'employers/staffs/:id',
        canActivate: [AdminGuard],
        component: StaffListComponent,
      },
      {
        path: 'employers/staffs/:id/add',
        canActivate: [AdminGuard],
        component: AddStaffComponent,
      },
      {
        path: 'employers/payment/:id',
        canActivate: [AdminGuard],
        component: EmployerPaymentInformationComponent,
        resolve: { data: AdminEmployerPaymentResolverService },
      },
      {
        path: 'companies/featured',
        canActivate: [AdminGuard],
        component: FeaturedCompaniesComponent,
        resolve: { data: FeaturedCompanyListResolverService },
      },

      {
        path: 'applicants',
        canActivate: [AdminGuard],
        component: ApplicantListComponent,
      },
      {
        path: 'password',
        canActivate: [AdminGuard],
        component: ChangePasswordComponent,
      },
      {
        path: 'applicants/details/:id',
        canActivate: [AdminGuard],
        component: ApplicantDetailComponent,
      },
      {
        path: 'applications',
        canActivate: [AdminGuard],
        component: ApplicationsListComponent,
      },
      {
        path: 'applicants/add',
        canActivate: [AdminGuard],
        component: AddApplicantComponent,
      },
      {
        path: 'ads',
        canActivate: [AdminGuard],
        component: AdvertisementListComponent,
        resolve: { data: AdsListResolverService },
      },
      {
        path: 'ads/add',
        canActivate: [AdminGuard],
        component: AddAdvertisementComponent,
      },
      {
        path: 'payment',
        canActivate: [AdminGuard],
        component: PaymentListComponent,
        resolve: { data: AdminPaymentListResolverService },
      },
      {
        path: 'payment/detail/:id',
        canActivate: [AdminGuard],
        component: EmployerPaymentInformationComponent,
        resolve: { data: AdminEmployerPaymentResolverService }
      },
      {
        path: 'plan_types',
        canActivate: [AdminGuard],
        component: PlanTypesComponent,
        resolve: { data: PaymentTypeResolverService },
      },
      {
        path: 'exempt',
        canActivate: [AdminGuard],
        component: ExemptedCompanyComponent,
        resolve: { data: ExemptResolverService },
      },
      // {
      //   path: 'plan_types/add',
      //   canActivate: [AdminGuard],
      //   component: AddPlanTypeComponent
      //   // resolve: { data: Add }
      // },
      // {
      //   path: 'plan_types/edit/:id',
      //   canActivate: [AdminGuard],
      //   component: EditPlanTypeComponent,
      //   resolve: { data: EditPaymentTypeResolverService }
      // },
      {
        path: 'employers/add_plan/:id',
        canActivate: [AdminGuard],
        component: EmployerPlanComponent,
        // resolve: { data: Add }
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
