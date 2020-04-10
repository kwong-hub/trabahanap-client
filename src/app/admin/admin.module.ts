import { PaymentTypeResolverService } from './../_resolvers/admin-resolvers/payment-type-resolver.service';
import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '../_helpers/jwt.intercepter';

import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { CompanyListComponent } from './components/company-list/company-list.component';
import {
  MatTableModule,
  MatPaginatorModule,
  MatButtonModule,
  MatMenuModule,
  MatProgressBarModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatNativeDateModule,
  MatInputModule,
  MatIconModule
} from '@angular/material';
import { MatExpansionModule } from '@angular/material/expansion';
import { IssuesComponent } from './components/issues/issues.component';
import { AddEmployerComponent } from './components/add-employer/add-employer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddEmployerJobComponent } from './components/add-employer-job/add-employer-job.component';
import { ApplicantListComponent } from './components/applicant-list/applicant-list.component';
import { AddApplicantComponent } from './components/add-applicant/add-applicant.component';
import { AddJobsComponent } from './components/add-jobs/add-jobs.component';
import { MiniJobDisplayComponent } from './components/mini-job-display/mini-job-display.component';
import { JobsListComponent } from './components/jobs-list/jobs-list.component';
import { AddLocationComponent } from './components/add-location/add-location.component';
import { CompanyLocationsComponent } from './components/company-locations/company-locations.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { StaffListComponent } from './components/staff-list/staff-list.component';
import { AddStaffComponent } from './components/add-staff/add-staff.component';
import { AllJobsComponent } from './components/all-jobs/all-jobs.component';
import { CompanyDetailComponent } from './components/company-detail/company-detail.component';
import { IssueListApplicantComponent } from './components/issue-list-applicant/issue-list-applicant.component';
import { IssueListEmployerComponent } from './components/issue-list-employer/issue-list-employer.component';
import { AdminStaffListComponent } from './components/admin-staff-list/admin-staff-list.component';
import { ApplicationsListComponent } from './components/applications-list/applications-list.component';
import { IssueDetailContainerComponent } from './components/issue-detail-container/issue-detail-container.component';
import { ApplicantDetailComponent } from './components/applicant-detail/applicant-detail.component';
import { CompanyLocationDetailComponent } from './components/company-location-detail/company-location-detail.component';
import { AddAdminStaffComponent } from './components/add-admin-staff/add-admin-staff.component';
import { ReportJobListComponent } from './components/report-job-list/report-job-list.component';
import { FeaturedCompaniesComponent } from './components/featured-companies/featured-companies.component';
import { ReportJobDetailComponent } from './components/report-job-detail/report-job-detail.component';
import { AdminService } from '@app/_services/admin.service';
import { AnonymousService } from '@app/_services/anonymous.service';
import { StateService } from '@app/_services/state.service';
import { OtherService } from '@app/_services/other.service';
import { AdminDashboardResolverService } from '@app/_resolvers/admin-dashboard-resolver.service';
import { ReportByIdResolverService } from '@app/_resolvers/admin-resolvers/report-by-id-resolver.service';
import { IssueByIdResolverService } from '@app/_resolvers/admin-resolvers/issue-by-id-resolver.service';
import { JobListResolverService } from '@app/_resolvers/admin-resolvers/job-list-resolver.service';
import { CompanyListResolverService } from '@app/_resolvers/admin-resolvers/company-list-resolver.service';
import { AdminStaffsListResolverService } from '@app/_resolvers/admin-resolvers/admin-staffs-list-resolver.service';
import { CountryRegionIndustryResolverService } from '@app/_resolvers/country-region-industry-resolver.service';
import { AdminLocationDetailResolverService } from '@app/_resolvers/admin-resolvers/admin-location-detail-resolver.service';
import { FeaturedCompanyListResolverService } from '@app/_resolvers/admin-resolvers/featured-company-list-resolver.service';
import { ApplicantListResolverService } from '@app/_resolvers/admin-resolvers/applicant-list-resolver.service';
import { ApplicationListResolverService } from '@app/_resolvers/admin-resolvers/application-list-resolver.service';
import { ErrorInterceptor } from '@app/_helpers/error.intercepter';
import { AdsListResolverService } from '@app/_resolvers/admin-resolvers/ads-list-resolver.service';
import { AddAdvertisementComponent } from './components/add-advertisement/add-advertisement.component';
import { AdvertisementListComponent } from './components/advertisement-list/advertisement-list.component';
import { PipesModule } from '@app/pipes/pipes.module';
import { PaymentListComponent } from './components/payment-list/payment-list.component';
import { PaymentDetailComponent } from './components/payment-detail/payment-detail.component';
import { AdminPaymentListResolverService } from '@app/_resolvers/admin-resolvers/admin-payment-list-resolver.service';
import { AdminPaymentDetailResolverService } from '@app/_resolvers/admin-resolvers/admin-payment-detail-resolver.service';
import { EmployerPaymentInformationComponent } from './components/employer-payment-information/employer-payment-information.component';
import { ApplicantReportComponent } from './components/applicant-report/applicant-report.component';
import { EmployerReportComponent } from './components/employer-report/employer-report.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { PlanTypesComponent } from './components/plan-types/plan-types.component';
import { AddPlanTypeComponent } from './components/add-plan-type/add-plan-type.component';
import { EditPlanTypeComponent } from './components/edit-plan-type/edit-plan-type.component';
import { EditPaymentTypeResolverService } from '@app/_resolvers/admin-resolvers/edit-payment-type-resolver.service';
import { EmployerPlanComponent } from './components/employer-plan/employer-plan.component';
import { ExemptedCompanyComponent } from './components/exempted-company/exempted-company.component';
import { PwdCompanyComponent } from './components/pwd-company/pwd-company.component';

@NgModule({
  declarations: [
    AdminComponent,
    HomeComponent,
    HeaderComponent,
    CompanyListComponent,
    IssuesComponent,
    AddEmployerComponent,
    AddEmployerJobComponent,
    ApplicantListComponent,
    AddApplicantComponent,
    AddJobsComponent,
    MiniJobDisplayComponent,
    JobsListComponent,
    AddLocationComponent,
    CompanyLocationsComponent,
    StaffListComponent,
    AddStaffComponent,
    AllJobsComponent,
    CompanyDetailComponent,
    IssueListApplicantComponent,
    IssueListEmployerComponent,
    AdminStaffListComponent,
    ApplicationsListComponent,
    IssueDetailContainerComponent,
    ApplicantDetailComponent,
    CompanyLocationDetailComponent,
    AddAdminStaffComponent,
    ReportJobListComponent,
    FeaturedCompaniesComponent,
    ReportJobDetailComponent,
    AddAdvertisementComponent,
    AdvertisementListComponent,
    PaymentListComponent,
    PaymentDetailComponent,
    EmployerPaymentInformationComponent,
    ApplicantReportComponent,
    EmployerReportComponent,
    PlanTypesComponent,
    AddPlanTypeComponent,
    EditPlanTypeComponent,
    EmployerPlanComponent,
    ExemptedCompanyComponent,
    PwdCompanyComponent
  ],
  imports: [
    AdminRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatMenuModule,
    MatExpansionModule,
    LeafletModule,
    MatProgressBarModule,
    PipesModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatIconModule,
    NgxDaterangepickerMd.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AdminService,
    OtherService,
    AnonymousService,
    StateService,
    AdminDashboardResolverService,
    ReportByIdResolverService,
    IssueByIdResolverService,
    JobListResolverService,
    CompanyListResolverService,
    AdminStaffsListResolverService,
    CountryRegionIndustryResolverService,
    AdminLocationDetailResolverService,
    FeaturedCompanyListResolverService,
    ApplicantListResolverService,
    ApplicationListResolverService,
    AdsListResolverService,
    AdminPaymentListResolverService,
    AdminPaymentDetailResolverService,
    PaymentTypeResolverService,
    EditPaymentTypeResolverService
  ]
})
export class AdminModule {}
