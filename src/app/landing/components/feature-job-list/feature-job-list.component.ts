import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "angularx-social-login";
import { AuthenticationService } from "@app/_services/authentication-service.service";
import { JobService } from "@app/_services/jobs.service";
import { AnonymousService } from "@app/_services/anonymous.service";

@Component({
  selector: "app-feature-job-list",
  templateUrl: "./feature-job-list.component.html",
  styleUrls: ["./feature-job-list.component.scss"]
})
export class FeatureJobListComponent implements OnInit {
  showLoader: boolean = false;
  jobs: any;
  public pager: any;
  public page: any;
  shouldLoad: boolean = true;
  reachedPageEnd: boolean = false;
  savedJobIds: string[] = [];
  filterHidden = true;
  filtered = false;
  company: any;
  belowScroll: boolean = true;
  imageUrl = `assets/img/pseudo/Logo${Math.floor(Math.random() * 10) + 1}.png`;

  @ViewChild("anchor", { static: false }) anchor: ElementRef<HTMLElement>;
  @ViewChild("jobsListAnchor", { static: false }) jobsListAnchor: ElementRef<
    HTMLElement
  >;
  pramsKey: any;
  compId: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private anonyService: AnonymousService,
    private Route: ActivatedRoute,
    private JobService: JobService,
    private authService: AuthenticationService
  ) {
    this.Route.data.subscribe(res => {
      let data = res.data;
      if (data) {
        let auth = this.authService.currentUserValue;
        if (auth === null || !auth.hasFinishedProfile) {
          this.jobs = data.jobs.rows;
          //this.company = { name: this.jobs[0].companyName || '', id: this.jobs[0].companyProfileId || '', logos: this.jobs[0].companyLogo || '', location: this.jobs[0].cityName || '', industry: this.jobs[0].industryType || '', desc: this.jobs[0].companyDescription || '' }

          this.page == data.jobs.pager.totalPages
            ? this.reachedPageEnd == true
            : "";
          this.pager = data.jobs.pager;
          this.page = data.jobs.pager.currentPage + 1;
          if (this.pager.totalItems < 8) {
            this.belowScroll = false;
            this.reachedPageEnd = true;
          } else {
            this.loadJobs();
          }
        } else {
          this.JobService.getApplicantSavedJobs().subscribe(resp => {
            if (resp.success && resp.jobs) {
              this.getSavedJobIds(resp.jobs);
            }
            this.jobs = data.jobs.rows;
            //this.company = { name: this.jobs[0].companyName || '', id: this.jobs[0].companyProfileId || '', logos: this.jobs[0].companyLogo || '', location: this.jobs[0].cityName || '', industry: this.jobs[0].industryType || '', desc: this.jobs[0].companyDescription || '' }

            this.page == data.jobs.pager.totalPages
              ? this.reachedPageEnd == true
              : "";
            this.pager = data.jobs.pager;
            this.page = data.jobs.pager.currentPage + 1;
            if (this.pager.totalItems < 8) {
              this.belowScroll = false;
              this.reachedPageEnd = true;
            } else {
              this.loadJobs();
            }
          });
        }
      }
    });
  }
  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.pramsKey = { ...params };
      this.compId = this.pramsKey.params.companyId;
    });

    this.anonyService.getCompanyByProfileId(this.compId).subscribe(data => {
      if (data.success) {
        this.company = data.employers.company;
      }
      // console.log(this.company)
    });
  }

  getSavedJobIds(jobs) {
    jobs.map(job => {
      this.savedJobIds.push(job.id);
    });
  }
  checkJobBookmarked(jobId) {
    return this.savedJobIds.includes(jobId);
  }

  loadJobs() {
    let elementPositionForScroll = 0;
    window.onscroll = () => {
      var bottomPosition = window.innerHeight + window.pageYOffset;
      var elementPosition = this.anchor
        ? this.anchor.nativeElement.offsetTop
        : 0;
      if (elementPosition > elementPositionForScroll) {
        if (elementPositionForScroll > 0) {
          window.scrollTo(
            0,
            elementPosition - elementPosition / (this.jobs.length / 8)
          );
        }
        elementPositionForScroll = elementPosition;
      }
      if (elementPosition > bottomPosition) {
        this.showLoader = true;
        this.shouldLoad = true;
      }
      if (
        bottomPosition > elementPosition &&
        this.shouldLoad &&
        !this.reachedPageEnd
      ) {
        this.shouldLoad = false;
        this.showLoader = true;

        this.anonyService
          .searchAllJobs("", "", this.compId || "", this.page)
          .subscribe(data => {
            if (this.jobs) {
              this.shouldLoad = data.jobs.rows.length > 0 ? true : false;

              if (data.jobs.rows.length > 0) {
                this.jobs.push(...data.jobs.rows);
                // this.shouldLoad = true;
                this.page = data.jobs.pager.currentPage + 1;
                this.pager = data.jobs.pager;
                if (data.jobs.pager.totalPages == data.jobs.pager.currentPage) {
                  this.reachedPageEnd = true;
                }
              }
            }
          });
      }
    };
  }
}
