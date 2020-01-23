import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { RecaptchaModule, RecaptchaFormsModule } from "ng-recaptcha";
import { NgxDocViewerModule } from "ngx-doc-viewer";

import { DashboardItemComponent } from "./components/dashboard-item/dashboard-item.component";
import { JobsListComponent } from "./../shared/components/jobs-list/jobs-list.component";
import { FooterComponent } from "./components/footer/footer.component";
import { JobComponent } from "./components/job/job.component";
import { CustomSelectComponent } from "./components/custom-select/custom-select.component";
import { CustomDatepickerComponent } from "./components/custom-datepicker/custom-datepicker.component";
import { CustomInputFieldComponent } from "./components/custom-input-field/custom-input-field.component";
import { CustomTextareaComponent } from "./components/custom-textarea/custom-textarea.component";

import { JobService } from "@app/_services/jobs.service";
import { JobSkeletonComponent } from "./components/job-skeleton/job-skeleton.component";
import { CustomFileInputComponent } from "./components/custom-file-input/custom-file-input.component";
import { LoaderComponent } from "./components/loader/loader.component";
import { SimpleFileInputComponent } from "./components/simple-file-input/simple-file-input.component";
import { JobDetailComponent } from "./components/job-detail/job-detail.component";
import { LeafletModule } from "@asymmetrik/ngx-leaflet";
import { MatButtonModule } from "@angular/material";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { IssueDetailsComponent } from "./components/issue-details/issue-details.component";
import { IssueFormComponent } from "./components/issue-form/issue-form.component";
import { ChangePasswordComponent } from "./components/change-password/change-password.component";
import { SharedDeleteModalComponent } from "./components/shared-delete-modal/shared-delete-modal.component";
import { SharedConfirmModelComponent } from "./components/shared-confirm-model/shared-confirm-model.component";
import { SharedLoginTempComponent } from "./components/shared-login-temp/shared-login-temp.component";
import { ChangePasswordTempComponent } from "./components/change-password-temp/change-password-temp.component";
import { EmployerService } from "@app/_services/employer.service";
import { ApplicantService } from "@app/_services/applicant.service";
import { LocationService } from "@app/_services/location.service";
@NgModule({
  declarations: [
    FooterComponent,
    CustomSelectComponent,
    CustomDatepickerComponent,
    JobComponent,
    JobsListComponent,
    DashboardItemComponent,
    CustomInputFieldComponent,
    CustomTextareaComponent,
    JobSkeletonComponent,
    CustomFileInputComponent,
    LoaderComponent,
    SimpleFileInputComponent,
    JobDetailComponent,
    PageNotFoundComponent,
    IssueDetailsComponent,
    IssueFormComponent,
    ChangePasswordComponent,
    SharedDeleteModalComponent,
    SharedConfirmModelComponent,
    SharedLoginTempComponent,
    ChangePasswordTempComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    NgxDocViewerModule,
    LeafletModule,
    MatButtonModule
  ],
  exports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FooterComponent,
    JobComponent,
    CustomSelectComponent,
    CustomDatepickerComponent,
    JobsListComponent,
    DashboardItemComponent,
    CustomInputFieldComponent,
    CustomTextareaComponent,
    JobSkeletonComponent,
    CustomFileInputComponent,
    LoaderComponent,
    SimpleFileInputComponent,
    NgxDocViewerModule,
    JobDetailComponent,
    SharedDeleteModalComponent,
    SharedConfirmModelComponent,
    SharedLoginTempComponent,
    ChangePasswordTempComponent
  ],
  providers: [JobService, EmployerService, ApplicantService, LocationService]
})
export class SharedModule {}
