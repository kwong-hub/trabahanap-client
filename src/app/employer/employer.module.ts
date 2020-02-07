import { EmployerService } from './../_services/employer.service';
import { EmployerComponent } from './employer.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '@app/_helpers/jwt.intercepter';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { EmployerRoutingModule } from './employer-routing.module';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { EmployerHeaderComponent } from './components/employer-header/employer-header.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { AddCompanyProfileComponent } from './components/add-company-profile/add-company-profile.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ErrorInterceptor } from '@app/_helpers/error.intercepter';
import { CandidatesComponent } from './components/candidates/candidates.component';
import { LocationsComponent } from './components/locations/locations.component';
import { StaffsComponent } from './components/staffs/staffs.component';
import { SubscriptionsComponent } from './components/subscriptions/subscriptions.component';
import { AddJobComponent } from './components/add-job/add-job.component';
import { MiniJobDisplayComponent } from './components/mini-job-display/mini-job-display.component';
import { AddLocationComponent } from './components/add-location/add-location.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationDetailComponent } from './components/location-detail/location-detail.component';
import { JobsListComponent } from './components/jobs-list/jobs-list.component';
import { MatTableModule, MatButtonModule, MatProgressBarModule } from '@angular/material';
import { MatPaginatorModule } from '@angular/material';
import { MatMenuModule } from '@angular/material/menu';
import { EditCompanyLogoModalComponent } from './components/edit-company-logo-modal/edit-company-logo-modal.component';
import { CandidatesListComponent } from './components/candidates-list/candidates-list.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { EditBusinessLicenseModalComponent } from './components/edit-business-license-modal/edit-business-license-modal.component';
import { JobCandidatesComponent } from './components/job-candidates/job-candidates.component';
import { JobEmployerComponent } from './components/job-employer/job-employer.component';
import { CandidateApplicantDetailComponent } from './components/candidate-applicant-detail/candidate-applicant-detail.component';
import { FilteredCandidatesComponent } from './components/filtered-candidates/filtered-candidates.component';
import { FilteredCandidatesListComponent } from './components/filtered-candidates-list/filtered-candidates-list.component';
import { FilteredJobCandidatesComponent } from './components/filtered-job-candidates/filtered-job-candidates.component';
import { FilteredCandidateApplicantDetailComponent } from './components/filtered-candidate-applicant-detail/filtered-candidate-applicant-detail.component';
import { AddStafferComponent } from './components/add-staffer/add-staffer.component';
import { IssueFormComponent } from './components/issue-form/issue-form.component';
import { IssueListComponent } from './components/issue-list/issue-list.component';
import { ApplicationsListComponent } from './components/applications-list/applications-list.component';
import { LocationService } from '@app/_services/location.service';
import { AnonymousService } from '@app/_services/anonymous.service';
import { OtherService } from '@app/_services/other.service';
import { StateService } from '@app/_services/state.service';
import { EmployerDashboardResolverService } from '@app/_resolvers/employer-dashboard-resolver.service';
import { CompanyProfileResolverService } from '@app/_resolvers/employer-resolvers/company-profile-resolver.service';
import { CompanyJobsResolverService } from '@app/_resolvers/employer-resolvers/company-jobs-resolver.service';
import { CompanyApplicationsResolverService } from '@app/_resolvers/employer-resolvers/company-applications-resolver.service';
import { CompanyCandidatesResolverService } from '@app/_resolvers/employer-resolvers/company-candidates-resolver.service';
import { FilteredCandidatesResolverService } from '@app/_resolvers/employer-resolvers/filtered-candidates-resolver.service';
import { CompanyLocationResolverService } from '@app/_resolvers/employer-resolvers/company-location-resolver.service';
import { CompanyStaffResolverService } from '@app/_resolvers/employer-resolvers/company-staff-resolver.service';
import { IssueDetailResolverService } from '@app/_resolvers/applicant-resolvers/issue-detail-resolver.service';
import { IndustryAndLocationResolverService } from '@app/_services/industry-and-location-resolver.service';
import { AddStafferFormComponent } from './components/add-staffer-form/add-staffer-form.component';
import { PaymentService } from '@app/_services/payment.service';
import { SubscriptionResolverService } from '@app/_resolvers/employer-resolvers/subscription-resolver.service';

@NgModule({
  declarations: [
    EmployerComponent,
    HomeComponent,
    EmployerHeaderComponent,
    JobsComponent,
    AddCompanyProfileComponent,
    ProfileComponent,
    CandidatesComponent,
    LocationsComponent,
    StaffsComponent,
    SubscriptionsComponent,
    AddJobComponent,
    MiniJobDisplayComponent,
    AddLocationComponent,
    LocationDetailComponent,
    JobsListComponent,
    EditCompanyLogoModalComponent,
    CandidatesListComponent,
    EditBusinessLicenseModalComponent,
    JobCandidatesComponent,
    JobEmployerComponent,
    CandidateApplicantDetailComponent,
    FilteredCandidatesComponent,
    FilteredCandidatesListComponent,
    FilteredJobCandidatesComponent,
    FilteredCandidateApplicantDetailComponent,
    AddStafferComponent,
    IssueFormComponent,
    IssueListComponent,
    ApplicationsListComponent,
    AddStafferFormComponent
  ],
  imports: [
    // BrowserAnimationsModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    EmployerRoutingModule,
    LeafletModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatMenuModule,
    MatExpansionModule,
    MatProgressBarModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AnonymousService,
    OtherService,
    StateService,
    EmployerDashboardResolverService,
    CompanyProfileResolverService,
    CompanyJobsResolverService,
    CompanyApplicationsResolverService,
    CompanyCandidatesResolverService,
    FilteredCandidatesResolverService,
    CompanyLocationResolverService,
    CompanyStaffResolverService,
    IssueDetailResolverService,
    IndustryAndLocationResolverService,
    PaymentService,
    SubscriptionResolverService
  ]
})
export class EmployerModule {}
