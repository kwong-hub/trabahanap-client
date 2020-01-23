import { AnonymousJobSkeletonComponent } from "./components/anonymous-job-skeleton/anonymous-job-skeleton.component";
import { AnonymousJobComponent } from "./components/anonymous-job/anonymous-job.component";
import { AnonymousJobsListComponent } from "./components/anonymous-jobs-list/anonymous-jobs-list.component";
import { AnonymousCustomSelectComponent } from "./components/anonymous-custom-select/anonymous-custom-select.component";
import { AnonymousCustomInputFieldComponent } from "./components/anonymous-custom-input-field/anonymous-custom-input-field.component";
import { HomeComponent } from "./components/home/home.component";
import { HomeSectionThreeComponent } from "./components/home-section-three/home-section-three.component";
import { HomeSectionTwoComponent } from "./components/home-section-two/home-section-two.component";
import { HomeSectionOneComponent } from "./components/home-section-one/home-section-one.component";
import { HeaderComponent } from "./components/header/header.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LandingComponent } from "./landing.component";
import { AnonymousFooterComponent } from "./components/anonymous-footer/anonymous-footer.component";
import { LandingRoutingModule } from "./landing-routing.module";
import { MatProgressBarModule } from "@angular/material";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LeafletModule } from "@asymmetrik/ngx-leaflet";
import { LandingNearJobsComponent } from "./components/landing-near-jobs/landing-near-jobs.component";
import { LandingJobDetailComponent } from "./components/landing-job-detail/landing-job-detail.component";
import { LandingJobListComponent } from "./components/landing-job-list/landing-job-list.component";
import { JobDetailResolverService } from "@app/_resolvers/job-detail-resolver.service";
import { SimpleJobSearchResolveService } from "@app/_resolvers/simple-job-search-resolve.service";
import { JobService } from "@app/_services/jobs.service";
import { AnonymousService } from "@app/_services/anonymous.service";
import { FeatureJobComponent } from "./components/feature-job/feature-job.component";

@NgModule({
  declarations: [
    LandingComponent,
    HeaderComponent,
    AnonymousFooterComponent,
    HomeComponent,
    HomeSectionOneComponent,
    HomeSectionTwoComponent,
    HomeSectionThreeComponent,
    LandingNearJobsComponent,
    LandingJobDetailComponent,
    LandingJobListComponent,
    AnonymousCustomInputFieldComponent,
    AnonymousCustomSelectComponent,
    AnonymousJobsListComponent,
    AnonymousJobComponent,
    AnonymousJobSkeletonComponent,
    FeatureJobComponent
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    LeafletModule,
    MatProgressBarModule
  ],
  providers: [
    JobDetailResolverService,
    SimpleJobSearchResolveService,
    JobService,
    AnonymousService
  ]
})
export class LandingModule {}
