import { Component, Input } from '@angular/core';
import { Job } from '@app/_models/Job';
import {
  faSlidersH,
  faEllipsisV,
  faPenFancy,
  faTrashAlt,
  faBan,
  faPause,
  faInbox,
  faCheckCircle,
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '@app/_services/jobs.service';
import { StateService } from '@app/_services/state.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployerService } from '@app/_services/employer.service';
import { Location } from '@angular/common';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.scss']
})
export class JobsListComponent {
  @Input() jobs: any;
  @Input() pager: any;
  public page: any;
  shouldLoad: boolean = true;
  reachedPageEnd: boolean = false;
  faSlidersH = faSlidersH;
  faEllipsisV = faEllipsisV;
  faPenFancy = faPenFancy;
  faTrashAlt = faTrashAlt;
  faCheckCircle = faCheckCircle;
  faTimesCircle = faTimesCircle;
  faPause = faPause;
  faInbox = faInbox;
  faBan = faBan;
  filterHidden = true;
  matPager: any = {
    pageIndex: 0,
    pageSize: 5
  };
  openActions = {};
  defaultLimit = { max: '50', min: '0' };
  displayedColumns: string[] = ['jobTitle', 'industry', 'education', 'salaryRange', 'appEnd', 'status', 'edit'];
  searchForm: FormGroup;

  filtered: boolean = false;
  isConfirmSuspend = false;
  isConfirmDelete = false;
  confirmHeader = 'Suspend a Job';
  confirmBody = 'Are you sure you want to suspend this job?';
  deletedId: any;
  constructor(
    private JobsService: JobService,
    private EmployerService: EmployerService,
    private route: ActivatedRoute,
    private router: Router,
    private stateService: StateService,
    private formBuilder: FormBuilder,
    private location: Location
  ) {}

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      jobTitle: ['', Validators.nullValidator],
      industry: ['', Validators.nullValidator],
      position: ['', Validators.nullValidator]
    });
    let elem = document.getElementsByClassName('overlay');
    elem[0].addEventListener('click', () => {
      this.openActions = {};
      this.filterHidden = true;
    });

    document.addEventListener('click', () => {
      this.openActions = {};
    });

    // this.route.queryParams.subscribe(
    //   data => {
    //     // console.log(data);
    //     this.matPager.pageIndex = +data.page - 1 >= 0 ? +data.page - 1 : 0;
    //     this.getServerData(this.matPager);
    //   },
    //   err => console.log(err)
    // );

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

  suspendJobs($event) {
    if ($event) {
      this.EmployerService.suspendJob(this.deletedId).subscribe(
        data => {
          this.jobs.forEach(job => {
            if (job.id === $event) {
              job.suspended = !job.suspended;

              //this.openActions[comp.id] = null;
            }
          });
        },
        error => {
          console.log(error);
        }
      );
    }
  }
  toggleSuspend($event) {
    this.isConfirmSuspend = !this.isConfirmSuspend;
    this.deletedId = $event;
  }

  toggleDelete($event) {
    this.confirmBody = '';
    this.isConfirmDelete = !this.isConfirmDelete;
    this.deletedId = $event;
  }

  editJob($event) {
    this.stateService.data = $event;
    this.router.navigate([`../jobs/${$event.id}`], { relativeTo: this.route });
  }

  candidatesJob($event) {
    this.stateService.data = $event;
    this.router.navigate([`../candidates/job/${$event}`], { relativeTo: this.route });
  }

  toggleActions($evnet, id) {
    $evnet.stopPropagation();
    this.openActions[id] = !this.openActions[id];
  }

  getServerData(page) {
    this.JobsService.getCompanyJobs(page.pageIndex + 1, page.pageSize).subscribe(
      success => {
        if (success.success == true) {
          this.jobs = success.jobs.rows;
          this.pager = success.jobs.pager;
          let path = this.location.path();
          if (path.indexOf('page') >= 0) {
            path = path.replace(/.$/, this.pager.currentPage.toString());
            this.location.go(path);
          } else {
            path = path.concat(`?page=${this.pager.currentPage}`);
            this.location.go(path);
          }
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
    this.EmployerService.getJobsFilter(val.jobTitle, val.industry, val.position, this.page || 1, 8).subscribe(data => {
      this.jobs = data.applications.rows;
      this.pager = data.applications.pager;
    });

    this.filtered = true;
  }
}
