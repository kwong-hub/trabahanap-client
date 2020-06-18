import { ApplicantComponent } from './applicant.component';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '../_helpers/jwt.intercepter';

import { ApplicantRoutingModule } from './applicant-routing.module';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { ApplicantHeaderComponent } from './components/applicant-header/applicant-header.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { ApplicationsComponent } from './components/applications/applications.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AddApplicantProfileComponent } from './components/add-applicant-profile/add-applicant-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditApplicantCvModalComponent } from './components/edit-applicant-cv-modal/edit-applicant-cv-modal.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { EditApplicantPictureModalComponent } from './components/edit-applicant-picture-modal/edit-applicant-picture-modal.component';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { ApplicationDetailComponent } from './components/application-detail/application-detail.component';
import { BookmarkDetailComponent } from './components/bookmark-detail/bookmark-detail.component';
import { ReportIssueComponent } from './components/report-issue/report-issue.component';
import { IssueFormComponent } from './components/issue-form/issue-form.component';
import { ReportJobComponent } from './components/report-job/report-job.component';
import { LocationService } from '@app/_services/location.service';
import { ApplicantApplicationsResolverService } from '@app/_services/applicant-applications-resolver.service';
import { JobDetailResolverService } from '@app/_resolvers/job-detail-resolver.service';
import { ApplicantSavedApplicationsResolverService } from '@app/_services/applicant-saved-applications-resolver.service';
import { IssueDetailResolverService } from '@app/_resolvers/applicant-resolvers/issue-detail-resolver.service';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ApplicantProfileResolverService } from '@app/_resolvers/applicant-resolvers/applicant-profile-resolver.service';
import { ErrorInterceptor } from '@app/_helpers/error.intercepter';
import { ApplicantDashboardResolverService } from '@app/_resolvers/applicant-resolvers/applicant-dashboard-resolver.service';

@NgModule({
  declarations: [
    ApplicantComponent,
    HomeComponent,
    ApplicantHeaderComponent,
    JobsComponent,
    ApplicationsComponent,
    CompaniesComponent,
    ProfileComponent,
    AddApplicantProfileComponent,
    EditApplicantCvModalComponent,
    EditApplicantPictureModalComponent,
    ApplicationDetailComponent,
    BookmarkDetailComponent,
    ReportIssueComponent,
    IssueFormComponent,
    ReportJobComponent
  ],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ApplicantRoutingModule,
    LeafletModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatMenuModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    ImageCropperModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ApplicantApplicationsResolverService,
    JobDetailResolverService,
    ApplicantSavedApplicationsResolverService,
    IssueDetailResolverService,
    ApplicantProfileResolverService,
    ApplicantDashboardResolverService
  ]
})
export class ApplicantModule {}
