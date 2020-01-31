import { Component, Input } from "@angular/core";
import { Job } from "@app/_models/Job";
import {
  faSlidersH,
  faEllipsisV,
  faPenFancy,
  faTrashAlt,
  faBan,
  faInbox
} from "@fortawesome/free-solid-svg-icons";
import { ActivatedRoute, Router } from "@angular/router";
import { JobService } from "@app/_services/jobs.service";
import { StateService } from "@app/_services/state.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { EmployerService } from "@app/_services/employer.service";

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: "app-jobs-list",
  templateUrl: "./jobs-list.component.html",
  styleUrls: ["./jobs-list.component.scss"]
})
export class JobsListComponent {
  @Input() jobs: Job[];
  @Input() pager: any;
  public page: any;
  shouldLoad: boolean = true;
  reachedPageEnd: boolean = false;
  faSlidersH = faSlidersH;
  faEllipsisV = faEllipsisV;
  faPenFancy = faPenFancy;
  faTrashAlt = faTrashAlt;
  faInbox = faInbox;
  faBan = faBan;
  filterHidden = true;
  openActions = {};
  defaultLimit ={max:"50",min:"0"};
  displayedColumns: string[] = [
    "jobTitle",
    "industry",
    "education",
    "salaryRange",
    "edit"
  ];
  searchForm: FormGroup;

  filtered: boolean = false;
  isLogoEditModalOpen = false;
  deletedId: any;
  constructor(
    private JobsService: JobService,
    private EmployerService: EmployerService,
    private route: ActivatedRoute,
    private router: Router,
    private stateService: StateService,
    private formBuilder: FormBuilder
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
    });

    document.addEventListener("click", () => {
      this.openActions = {};
    });

    // this.JobsService.getCompanyJobs(1, this.pager ? this.pager.pageSize : 8)
    //   .subscribe(
    //     success => {
    //       if (success.success == true) {
    //         this.jobs = success.jobs.rows;
    //         this.pager = success.jobs.pager;
    //       }
    //     },
    //     err => console.log(err)
    //   )
  } // ngOnInit ends here

  deleteJob($event) {
    if ($event) {
      this.EmployerService.deleteEmployerJob(this.deletedId).subscribe(data => {
        if (data.success) {
          this.jobs = this.jobs.filter(item => {
            if (item.id !== data.job.id) {
              return item;
            }
          });
          this.pager.totalItems = this.pager.totalItems - 1;
        }
      });
    }
  }
  toggleJob($event) {
    this.isLogoEditModalOpen = !this.isLogoEditModalOpen;
    this.deletedId = $event;
  }

  editJob($event) {
    this.stateService.data = $event;
    this.router.navigate([`../jobs/${$event.id}`],{relativeTo: this.route});

  }

  candidatesJob($event) {
    this.stateService.data = $event;
    this.router.navigate([`../candidates/job/${$event}`],{relativeTo: this.route});

  }

  toggleActions($evnet, id) {
    $evnet.stopPropagation();
    this.openActions[id] = !this.openActions[id];
  }

  getServerData(page) {
    this.JobsService.getCompanyJobs(
      page.pageIndex + 1,
      page.pageSize
    ).subscribe(
      success => {
        if (success.success == true) {
          this.jobs = success.jobs.rows;
          this.pager = success.jobs.pager;
          // this.pager.pages = this.renderedPages();
        }
      },
      err => console.log(err)
    );
  }
  toggleFilter(event) {
    event.stopPropagation();
    this.filterHidden = !this.filterHidden;
  }

  filterJobsApplications() {
    var val = this.searchForm.value;
    this.filterHidden = true;
    this.EmployerService.getJobsFilter(val.jobTitle, val.industry, val.position, this.page || 1,8)
      .subscribe(
        data => {
          this.jobs = data.applications.rows;
          this.pager = data.applications.pager;
        }
      )

    this.filtered = true;
  }

  // renderedPages(){
  //   if(this.pager.totalPages <= 5){
  //     return [0,1,2,3,4].filter(n => n+1 <= this.pager.totalPages);
  //   }
  //   let array = [];
  //   array.push(this.pager.currentPage-1);
  //   if(this.pager.currentPage+1 > this.pager.totalPages){
  //     array.unshift(...[this.pager.currentPage-5, this.pager.currentPage-4, this.pager.currentPage-3, this.pager.currentPage-2])
  //   }else if(this.pager.currentPage+2 > this.pager.totalPages){
  //     array.unshift(...[this.pager.currentPage-4, this.pager.currentPage-3, this.pager.currentPage-2])
  //     array.push(this.pager.currentPage);
  //   }else if(this.pager.currentPage-2 < 0){
  //     array.push(...[this.pager.currentPage, this.pager.currentPage+1, this.pager.currentPage+2, this.pager.currentPage+3])
  //   }else if(this.pager.currentPage-3 < 0){
  //     array.push(...[this.pager.currentPage, this.pager.currentPage+1, this.pager.currentPage+2])
  //     array.unshift(this.pager.currentPage-2);
  //   }else{
  //     array.push(...[this.pager.currentPage, this.pager.currentPage+1]);
  //     array.unshift(...[this.pager.currentPage-3, this.pager.currentPage-2])
  //   }
  //   return array;
  // }
}
