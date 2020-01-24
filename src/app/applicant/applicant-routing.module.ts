import { ApplicantSavedApplicationsResolverService } from "./../_services/applicant-saved-applications-resolver.service";
import { ApplicantApplicationsResolverService } from "../_services/applicant-applications-resolver.service";
import { ProfileComponent } from "./components/profile/profile.component";
import { CompaniesComponent } from "./components/companies/companies.component";
import { ApplicationsComponent } from "./components/applications/applications.component";
import { JobsComponent } from "./components/jobs/jobs.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { ApplicantComponent } from "./applicant.component";
import { ApplicantGuard } from "./_helpers/applicant.guard";
import { JobDetailComponent } from "@app/shared/components/job-detail/job-detail.component";
import { ApplicationDetailComponent } from "./components/application-detail/application-detail.component";
import { BookmarkDetailComponent } from "./components/bookmark-detail/bookmark-detail.component";
import { ReportIssueComponent } from "./components/report-issue/report-issue.component";
import { PageNotFoundComponent } from "@app/shared/components/page-not-found/page-not-found.component";
import { IssueDetailResolverService } from "@app/_resolvers/applicant-resolvers/issue-detail-resolver.service";
import { IssueDetailsComponent } from "@app/shared/components/issue-details/issue-details.component";
import { ChangePasswordComponent } from "@app/shared/components/change-password/change-password.component";
import { JobDetailResolverService } from "@app/_resolvers/job-detail-resolver.service";
import { ReportJobComponent } from "./components/report-job/report-job.component";
import { ApplicantProfileResolverService } from "@app/_resolvers/applicant-resolvers/applicant-profile-resolver.service";

const routes: Routes = [
  {
    path: "",
    component: ApplicantComponent,
    children: [
      { path: "", redirectTo: "home", pathMatch: "full" },
      { path: "home", canActivate: [ApplicantGuard], component: HomeComponent },
      { path: "jobs", canActivate: [ApplicantGuard], component: JobsComponent },
      {
        path: "applications",
        canActivate: [ApplicantGuard],
        component: ApplicationsComponent,
        resolve: { jobs: ApplicantApplicationsResolverService }
      },
      {
        path: "applications/details/:id",
        canActivate: [ApplicantGuard],
        component: JobDetailComponent,
        resolve: { data: JobDetailResolverService }
      },
      {
        path: "bookmarks",
        canActivate: [ApplicantGuard],
        component: CompaniesComponent,
        resolve: { jobs: ApplicantSavedApplicationsResolverService }
      },
      {
        path: "bookmarks/details/:id",
        canActivate: [ApplicantGuard],
        component: JobDetailComponent,
        resolve: { data: JobDetailResolverService }
      },
      {
        path: "profile",
        canActivate: [ApplicantGuard],
        component: ProfileComponent,
        resolve: { data: ApplicantProfileResolverService }
      },
      {
        path: "issues",
        canActivate: [ApplicantGuard],
        component: ReportIssueComponent
      },
      {
        path: "issues/details/:id",
        canActivate: [ApplicantGuard],
        component: IssueDetailsComponent,
        resolve: { data: IssueDetailResolverService }
      },
      {
        path: "password",
        canActivate: [ApplicantGuard],
        component: ChangePasswordComponent
      },
      {
        path: "jobs/details/:id",
        canActivate: [ApplicantGuard],
        component: JobDetailComponent,
        resolve: { data: JobDetailResolverService }
      },
      {
        path: "jobs/report/:id",
        canActivate: [ApplicantGuard],
        component: ReportJobComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicantRoutingModule {}
