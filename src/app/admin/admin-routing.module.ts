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
import { AddJobsComponent} from './components/add-jobs/add-jobs.component'
import { JobsListComponent } from './components/jobs-list/jobs-list.component'
import { CompanyLocationsComponent } from './components/company-locations/company-locations.component';
import { AddLocationComponent } from './components/add-location/add-location.component';
import { IndustryAndLocationResolverService } from '@app/_services/industry-and-location-resolver.service';
import { StaffListComponent } from './components/staff-list/staff-list.component';
import { AddStaffComponent } from './components/add-staff/add-staff.component';
import { AllJobsComponent } from './components/all-jobs/all-jobs.component'
import { CompanyDetailComponent } from './components/company-detail/company-detail.component';
import { IssueListApplicantComponent } from './components/issue-list-applicant/issue-list-applicant.component';
import { IssueListEmployerComponent } from './components/issue-list-employer/issue-list-employer.component';
import { AdminStaffListComponent } from './components/admin-staff-list/admin-staff-list.component';
import { ApplicationsListComponent} from './components/applications-list/applications-list.component'
import { SuperAdminGuard } from './_helpers/super-admin.guard';
import { AdminDashboardResolverService } from '@app/_resolvers/admin-dashboard-resolver.service';
import { IssueDetailContainerComponent } from './components/issue-detail-container/issue-detail-container.component';
import { IssueByIdResolverService } from '@app/_resolvers/admin-resolvers/issue-by-id-resolver.service';

import { ApplicantDetailComponent } from './components/applicant-detail/applicant-detail.component'
import { CompanyLocationDetailComponent } from './components/company-location-detail/company-location-detail.component';
import { AdminLocationDetailResolverService } from '@app/_resolvers/admin-resolvers/admin-location-detail-resolver.service';
import { ChangePasswordComponent } from '@app/shared/components/change-password/change-password.component';
import { CompanyListResolverService } from '@app/_resolvers/admin-resolvers/company-list-resolver.service';
import { ApplicantListResolverService } from '@app/_resolvers/admin-resolvers/applicant-list-resolver.service';
import { JobListResolverService } from '@app/_resolvers/admin-resolvers/job-list-resolver.service';
import { ApplicationListResolverService } from '@app/_resolvers/admin-resolvers/application-list-resolver.service';
import { AddAdminStaffComponent } from './components/add-admin-staff/add-admin-staff.component'
import { AdminStaffsListResolverService } from '@app/_resolvers/admin-resolvers/admin-staffs-list-resolver.service';
import { ReportJobListComponent } from './components/report-job-list/report-job-list.component';
import { FeaturedCompanyListResolverService } from '@app/_resolvers/admin-resolvers/featured-company-list-resolver.service';
import { ReportJobDetailComponent } from './components/report-job-detail/report-job-detail.component'
import { ReportByIdResolverService } from '@app/_resolvers/admin-resolvers/report-by-id-resolver.service';

const routes: Routes = [
  { path: '', component: AdminComponent,
  children: [
    { path: 'home', canActivate: [AdminGuard], component: HomeComponent, resolve: { dashRes: AdminDashboardResolverService}},
    { path: '', canActivate: [AdminGuard], redirectTo: 'home', pathMatch: 'full'},
    { path: 'issues', canActivate: [AdminGuard], component: IssuesComponent},
    { path: 'issues/applicant', canActivate: [AdminGuard], component: IssueListApplicantComponent},
    { path: 'issues/report', canActivate: [AdminGuard], component:ReportJobListComponent},
    { path: 'issues/report/detail/:id', canActivate: [AdminGuard], component:ReportJobDetailComponent, resolve:{data:ReportByIdResolverService}},
    { path: 'issues/applicant/details/:id', canActivate: [AdminGuard], component: IssueDetailContainerComponent, resolve: { data: IssueByIdResolverService}},
    { path: 'issues/employer', canActivate: [AdminGuard], component: IssueListEmployerComponent},
    { path: 'issues/employer/details/:id', canActivate: [AdminGuard], component: IssueDetailContainerComponent, resolve: { data: IssueByIdResolverService}},
    { path: 'jobs', canActivate: [AdminGuard], component: AllJobsComponent, resolve: {data: JobListResolverService}},
    { path: 'employers', canActivate: [AdminGuard], component: CompanyListComponent, resolve: {data: CompanyListResolverService}},
    { path: 'staff', canActivate: [SuperAdminGuard], component: AdminStaffListComponent,resolve:{data:AdminStaffsListResolverService}},
    { path: 'staff/add', canActivate: [SuperAdminGuard], component: AddAdminStaffComponent},
    { path: 'employers/details/:id', canActivate: [AdminGuard], component: CompanyDetailComponent},
    { path: 'employers/add', canActivate: [AdminGuard], component: AddEmployerComponent, resolve: {data: CountryRegionIndustryResolverService}},
    { path: 'employers/add_job', canActivate: [AdminGuard], component: AddEmployerJobComponent},
    { path: 'employers/jobs/:id/add/:jobId', canActivate: [AdminGuard], component: AddJobsComponent},
    // { path: 'employers/jobs/:id/add', canActivate: [AdminGuard], component: AddJobsComponent},
    { path: 'employers/jobs/:id', canActivate: [AdminGuard], component: JobsListComponent},
    { path: 'employers/locations/:id', canActivate: [AdminGuard], component: CompanyLocationsComponent },
    { path: 'employers/locations/:id/add', canActivate: [AdminGuard], component: AddLocationComponent },
    { path: 'employers/locations/:id/edit/:locationId', canActivate: [AdminGuard], component: CompanyLocationDetailComponent, resolve: { location: AdminLocationDetailResolverService, helpers: CountryRegionIndustryResolverService} },
    { path: 'employers/staffs/:id', canActivate: [AdminGuard], component: StaffListComponent },
    { path: 'employers/staffs/:id/add', canActivate: [AdminGuard], component: AddStaffComponent },

    { path: 'companies/featured', canActivate: [AdminGuard], component: FeaturedCompaniesComponent, resolve: {data: FeaturedCompanyListResolverService} },
    
    { path: 'applicants', canActivate: [AdminGuard], component: ApplicantListComponent, resolve: {data: ApplicantListResolverService}},
    { path: 'password', canActivate: [AdminGuard], component: ChangePasswordComponent},
    { path: 'applicants/details/:id', canActivate: [AdminGuard], component: ApplicantDetailComponent},
    { path: 'applications', canActivate: [AdminGuard], component: ApplicationsListComponent, resolve: {data: ApplicationListResolverService}},
    { path: 'applicants/add', canActivate: [AdminGuard], component: AddApplicantComponent},
    { path: '', redirectTo: 'home', pathMatch: 'full'},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }