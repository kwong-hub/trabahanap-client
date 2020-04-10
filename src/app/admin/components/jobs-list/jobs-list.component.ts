import { Component, OnInit } from '@angular/core';
import { AdminService } from '@app/_services/admin.service';
import { Job } from '@app/_models/Job';
import {
  faSlidersH,
  faPlus,
  faEllipsisV,
  faPenFancy,
  faTrashAlt,
  faBan,
  faInbox
} from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { StateService } from '@app/_services/state.service';

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.scss']
})
export class JobsListComponent implements OnInit {
  public jobs: Job[];
  public pager: any;
  public page: any;
  shouldLoad: boolean = true;
  reachedPageEnd: boolean = false;
  faSlidersH = faSlidersH;
  faEllipsisV = faEllipsisV;
  faPenFancy = faPenFancy;
  faTrashAlt = faTrashAlt;
  faInbox = faInbox;
  faBan = faBan;
  faPlus = faPlus;
  filterHidden = true;
  openActions = {};
  companyId;
  empty = false;
  hasValues = false;
  matPager: any = {
    pageIndex: 0,
    pageSize: 8
  };

  displayedColumns: string[] = ['jobTitle', 'industry', 'vacancies', 'application','hiredApplicant', 'edit'];

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router,
    private stateService: StateService
  ) {}

  ngOnInit() {
    this.companyId = this.route.snapshot.params.id;
    document.addEventListener('click', () => {
      this.openActions = {};
    });

    this.route.queryParams.subscribe(
      data => {
        this.matPager.pageIndex = +data.page - 1 >= 0 ? +data.page - 1 : 0;
        this.getServerData(this.matPager);
      },
      err => console.log(err)
    );
    // this.adminService.getAllJobs(1, this.pager ? this.pager.pageSize : 3, this.companyId).subscribe(
    //   data => {
    //     if (data.success) {
    //       this.jobs = data.jobs.rows;
    //       this.pager = data.jobs.pager;
    //       //this.jobs = data.jobs;
    //     }
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // );
  }

  deleteJob($event) {}

  editJob($event) {
    this.stateService.data = $event;
    this.router.navigate([`../../jobs/${this.companyId}/add/${$event.id}`], {
      relativeTo: this.route
    });
  }

  linkClick(event) {
    event.stopPropagation();
  }

  toggleActions($evnet, id) {
    $evnet.stopPropagation();
    this.openActions[id] = !this.openActions[id];
  }

  getServerData(page) {
    this.adminService.getAllJobs(page.pageIndex + 1, page.pageSize, this.companyId).subscribe(
      success => {
        console.log(success)
        if (success.success == true) {
          this.jobs = success.jobs.rows;
          this.pager = success.jobs.pager;
          this.jobs.length == 0 ? (this.empty = true) : (this.hasValues = true);
          this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { page: this.pager.currentPage },
            replaceUrl: true,
            queryParamsHandling: 'merge'
          });
          // this.pager.pages = this.renderedPages();
        }
      },
      err => console.log(err)
    );
  }
}
