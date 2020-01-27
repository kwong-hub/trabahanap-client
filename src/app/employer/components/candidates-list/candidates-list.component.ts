import { JobService } from "@app/_services/jobs.service";

import { Component, OnInit, Input } from "@angular/core";
import {
  faUsers,
  faPenFancy,
  faSlidersH
} from "@fortawesome/free-solid-svg-icons";
import { Router, ActivatedRoute } from "@angular/router";
import { count } from "rxjs/operators";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { EmployerService } from "@app/_services/employer.service";

@Component({
  selector: "app-candidates-list",
  templateUrl: "./candidates-list.component.html",
  styleUrls: ["./candidates-list.component.scss"]
})
export class CandidatesListComponent implements OnInit {
  panelOpenState = false;
  @Input() jobs: any = [];
  faUsers = faUsers;
  faPenFancy = faPenFancy;
  faSlidersH = faSlidersH;
  displayedColumns: string[] = [
    "jobTitle",
    "position",
    "noOfApplicants",
    "detail"
  ];
  public page: any;
  @Input() pager: any;
  searchForm: FormGroup;
  filterHidden: boolean = true;
  filtered: boolean = false;
  openActions: {};

  constructor(
    private JobsService: JobService,
    private EmployerService: EmployerService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      jobTitle: ["", Validators.nullValidator],
      industry: ["", Validators.nullValidator],
      position: ["", Validators.nullValidator]
    });

    let elem = document.getElementsByClassName("overlay");
    elem[0].addEventListener("click", () => {
      this.openActions = {};
      this.filterHidden = true;
     // console.log(this.filterHidden);
    });
  }

  updateExpansionState(jobId) {
    console.log(jobId);
  }

  showCadidates(application) {
    this.router.navigate([`../candidates/job/${application.jobId}`], {
      relativeTo: this.route
    });
  }

  getServerData(page) {
    if (!this.filtered) {
      this.JobsService.getJobWithApplications(
        page.pageIndex + 1,
        page.pageSize
      ).subscribe(
        success => {
          if (success.success == true) {
            this.jobs = success.applications.rows;
            this.pager = success.applications.pager;
            // this.pager.pages = this.renderedPages();
          }
        },
        err => console.log(err)
      );
    } else {
      var val = this.searchForm.value;
      this.EmployerService.getFilterJobsApplications(val.jobTitle, val.industry, val.position, page.pageIndex + 1,page.pageSize)
        .subscribe(
          data => {
            //console.log(data);
            if (data.success == true) {
              this.jobs = data.applications.rows;
              this.pager = data.applications.pager;
            }

          }
        )


    }
  }

  toggleFilter(event) {
    event.stopPropagation();
    this.filterHidden = !this.filterHidden;
  }

  filterJobsApplications() {
    var val = this.searchForm.value;
    //console.log(val);
    this.filterHidden = true;
    this.EmployerService.getFilterJobsApplications(val.jobTitle, val.industry, val.position, this.page || 1,8)
      .subscribe(
        data => {
          this.jobs = data.applications.rows;
          this.pager = data.applications.pager;
        }
      )

    this.filtered = true;
  }
}
