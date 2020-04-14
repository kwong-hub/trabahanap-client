import { Component, OnInit } from '@angular/core';
import { AdminService } from '@app/_services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StateService } from '@app/_services/state.service';
import { Moment } from 'moment';
import * as moment from 'moment';
import { Location } from '@angular/common';
import { ngxCsv } from 'ngx-csv';

@Component({
  selector: 'app-pwd-company',
  templateUrl: './pwd-company.component.html',
  styleUrls: ['./pwd-company.component.scss']
})
export class PwdCompanyComponent implements OnInit {
  empty = false;
  hasValues = false;
  matPager: any = {
    pageIndex: 0,
    pageSize: 8
  };
  public jobs: any;
  public pager: any;
  public page: any;
  shouldLoad: boolean = true;
  reachedPageEnd: boolean = false;
  columnTitle: string[] = ['date', 'Company', 'Job', 'Vacancies',
    'No Applicant'];
  displayedColumns: string[] = ['date', 'companyName', 'jobTitle', 'vacancy', 'applicant'];
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
  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router,
    private stateService: StateService,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(
      data => {
        this.matPager.pageIndex = +data.page - 1 >= 0 ? +data.page - 1 : 0;
        this.getServerData(this.matPager);
      },
      err => console.log(err)
    );
  }

  getServerData(page) {

    if (this.filtered) {
      this.adminService.filterPwdJobReport({ startDate: this.selected.startDate.format('YYYY-MM-DD'), endDate: this.selected.endDate.format('YYYY-MM-DD') }, page.pageIndex, page.pageSize).subscribe(
        data => {
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
        }
      )
    } else {
      this.adminService.getPwdJobs(page.pageIndex + 1, page.pageSize).subscribe(
        success => {
          if (success.success == true) {
            this.jobs = success.job.rows;
            this.pager = success.job.pager;
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
      this.adminService.filterPwdJobReport({ startDate: e.startDate.format('YYYY-MM-DD'), endDate: e.endDate.format('YYYY-MM-DD') }, 1, 7).subscribe(
        data => {
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
    if (this.filtered) {
      let diff = this.selected.endDate.diff(this.selected.startDate, 'days') + 1;
      this.adminService.filterPwdJobReport({ startDate: this.selected.startDate.format('YYYY-MM-DD'), endDate: this.selected.endDate.format('YYYY-MM-DD') }, 1, diff, 'ASC').subscribe(
        data => {
          if (data.success) {
            let expo = data.stats.rows;
            let options = {
              headers: this.columnTitle,
              title: 'Pwd Job',
            }
            new ngxCsv(expo, 'Pwd Job Report-' + moment().format('MMDDYYYY'), options);
          }
        },
        err => {
          console.log(err)
        }
      )
    }
    else {
      this.adminService.getPwdJobs(1, 25).subscribe(
        data => {
          if (data.success) {
            let expo = data.job.rows;
            let options = {
              headers: this.columnTitle,
              title: 'Pwd Job',
            }
            new ngxCsv(expo, 'PWD Job Report-' + moment().format('MMDDYYYY'), options);
          }
        },
        error => {
          console.log(error)
        }
      );
    }
  }


}
