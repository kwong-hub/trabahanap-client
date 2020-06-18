import { Component, OnInit } from '@angular/core';
import { Moment } from 'moment';
import * as moment from 'moment';
import { Location } from '@angular/common';
import { ngxCsv } from 'ngx-csv';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '@app/_services/admin.service';

@Component({
  selector: 'app-job-report',
  templateUrl: './job-report.component.html',
  styleUrls: ['./job-report.component.scss']
})
export class JobReportComponent implements OnInit {
  empty = false;
  hasValues = false;
  matPager: any = {
    pageIndex: 0,
    pageSize: 8
  };
  public pager: any;
  public page: any;
  shouldLoad: boolean = true;
  reachedPageEnd: boolean = false;
  columnTitle: string[] = ['Date', 'Company', 'Job', 'Vacancies', 'No Applicant'];
  displayedColumns: string[] = ['date', 'dailyJobs', 'subTotal', 'pwd', 'vacancies'];
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
  rows: any;

  constructor(private route: ActivatedRoute, private adminService: AdminService, 
    private router: Router, private location: Location) { }

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
      this.adminService.filterJobsReport({startDate: this.selected.startDate.format('YYYY-MM-DD'), endDate: this.selected.endDate.format('YYYY-MM-DD')}, page.pageIndex + 1, page.pageSize).subscribe(
        data => {
          if (data.success) {
            this.rows = data.stats.rows;
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
      this.adminService.getJobsReport(page.pageIndex + 1, page.pageSize).subscribe(
        data => {
          if(data.success) {
            this.rows = data.stats.rows;
            this.pager = data.stats.pager;
            let path = this.location.path();
              if (path.indexOf('page') >= 0) {
                path = path.replace(/.$/, this.pager.currentPage.toString());
                this.location.go(path);
              } else {
                path = path.concat(`?page=${this.pager.currentPage}`);
                this.location.go(path);
              }
          }
        },
        err => console.log(err)
      );
    }

  }

  onDatesUpdated(e) {
    if(e.startDate) {
      // let diff = e.endDate.diff(e.startDate, 'days');
      this.adminService.filterJobsReport({startDate: e.startDate.format('YYYY-MM-DD'), endDate: e.endDate.format('YYYY-MM-DD')}, 1, 7).subscribe(
        data => {
          if(data.success) {
            this.rows = data.stats.rows;
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
  }

  exportCSV() {
    if(this.filtered) {
      let diff = this.selected.endDate.diff(this.selected.startDate, 'days') + 1;
      this.adminService.filterJobsReport({startDate: this.selected.startDate.format('YYYY-MM-DD'), endDate: this.selected.endDate.format('YYYY-MM-DD')}, 1, diff, 'ASC').subscribe(
        data => {
          if(data.success) {
            let expo = data.stats.rows;
            let options = {
              headers: this.columnTitle
            }
            new ngxCsv(expo, `Jobs Report${moment().format('MMDDYYYY')}`, options);
          }
        },
        err => {
          console.log(err)
        }
      )
    }
    else {
      this.adminService.getJobsReport(1, this.page.pageSize, 'ASC').subscribe(
        data => {
          if(data.success) {
            let expo = data.stats.rows;
            let options = {
              headers: this.columnTitle
            }
            new ngxCsv(expo, `Jobs Report${moment().format('MMDDYYYY')}`, options);
          }
        },
        error => {
          console.log(error)
        }
      );
    }
  }
}
