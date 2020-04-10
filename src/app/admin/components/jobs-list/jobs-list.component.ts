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
import { Moment } from 'moment';
import * as moment from 'moment';
import { Location } from '@angular/common';
import { ngxCsv } from 'ngx-csv';

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.scss']
})
export class JobsListComponent implements OnInit {
  public jobs:any=[];
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
  selected: { startDate: Moment, endDate: Moment };
  ranges: any = {
    // 'Today': [moment(), moment()],
    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment()],
    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
  }
  filtered: boolean;
  maxDate = moment().subtract(1, 'days');
  minDate = moment('2018-01-01');

  displayedColumns: string[] = ['date','jobTitle', 'industry', 'vacancies', 'application', 'hiredApplicant'];
  rows: any;
  columnTitle: string[] = ['date','Job', 'Location', 'Vacancies', 
  'No Applicant', 'No Hired Applicant'];

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router,
    private stateService: StateService,
    private location: Location
  ) { }

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

  deleteJob($event) { }

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

    if (this.filtered) {
      this.adminService.filterJobReport(this.companyId, {startDate: this.selected.startDate.format('YYYY-MM-DD'), endDate: this.selected.endDate.format('YYYY-MM-DD')}, page.pageIndex, page.pageSize).subscribe(
        data => {
          if (data.success) {
            this.hasValues = true
            this.jobs = data.stats.rows;
            this.pager = data.stats.pager;
            let path = this.location.path();
            if (path.indexOf('page') >= 0) {
              path = path.replace(/.$/, this.pager.currentPage.toString());
              this.location.go(path);
            } else {
              path = path.concat(`?page=${this.pager.currentPage}`);
              this.location.go(path);
            }
            this.filtered = true;

          }else{
            this.hasValues = false;
          }
        },
        err => {
          console.log(err)
        }
      )
    } else {
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


  onDatesUpdated(e) {
    if (e.startDate) {
      // let diff = e.endDate.diff(e.startDate, 'days');
      this.adminService.filterJobReport(this.companyId, { startDate: e.startDate.format('YYYY-MM-DD'), endDate: e.endDate.format('YYYY-MM-DD') }, 1, 7).subscribe(
        data => {
          console.log(data,'flter')
          if (data.success) {
            this.jobs = data.stats.rows;
            this.pager = data.stats.pager;
            let path = this.location.path();
            if (path.indexOf('page') >= 0) {
              path = path.replace(/.$/, this.pager.currentPage.toString());
              this.location.go(path);
            } else {
              path = path.concat(`?page=${this.pager.currentPage}`);
              this.location.go(path);
            }
            this.filtered = true;

          }
        },
        err => {
          console.log(err)
        }
      )
    }
    else {
      // this.getServerData(this.matPager)
    }
  }

  exportCSV() {
    if(this.filtered) {
      let diff = this.selected.endDate.diff(this.selected.startDate, 'days') + 1;
      this.adminService.filterJobReport(this.companyId,{startDate: this.selected.startDate.format('YYYY-MM-DD'), endDate: this.selected.endDate.format('YYYY-MM-DD')}, 1, diff, 'ASC').subscribe(
        data => {
          if(data.success) {
            let expo = data.stats.rows;
            let options = {
              headers: this.columnTitle,
              title: 'Employer Job',
            }
            new ngxCsv(expo, 'Employer Job Report-'+moment().format('MMDDYYYY'), options);
          }
        },
        err => {
          console.log(err)
        }
      )
    }
    else {
      this.adminService.getAllJobs(1, 25, this.companyId).subscribe(
        data => {
          if(data.success) {
            let expo = data.jobs.rows;
            let options = {
              headers: this.columnTitle,
              title: 'Employer Job',
            }
            new ngxCsv(expo, 'Employer Job Report-'+moment().format('MMDDYYYY'), options);
          }
        },
        error => {
          console.log(error)
        }
      );
    }
  }

}
