import { Component, OnInit } from '@angular/core';
import { AdminService } from '@app/_services/admin.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Moment } from 'moment';
import * as moment from 'moment';
import { ngxCsv } from 'ngx-csv/ngx-csv';

@Component({
  selector: 'app-applicant-report',
  templateUrl: './applicant-report.component.html',
  styleUrls: ['./applicant-report.component.scss']
})
export class ApplicantReportComponent implements OnInit {

  displayedColumns: string[] = ['date', 'registrationPerDay', 'subTotal', 'viaGoogle', 'viaFacebook', 
    'viaNormal', 'logins', 'activeUsers', 'returningUsers', 'applicationsPerDay', 'applicantsPerDay'];
  columnTitle: string[] = ['Date', 'Daily Registrations', 'Total Registrations', 'Google Registration', 
    'Facebook Registration', 'Normal Registration', 'Daily Logins', 'Active Users', 'Returning Users', 'Daily Applications', 'Daily Applicants']
  rows;
  matPager: any = {
    pageIndex: 0,
    pageSize: 7
  };
  pager: any;
  selected: {startDate: Moment, endDate: Moment};
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
  page: any;

  constructor(private adminService: AdminService, private route: ActivatedRoute, private location: Location) { }

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
    this.page = page;
      if(this.filtered) {
      this.adminService.filterApplicantReport({startDate: this.selected.startDate.format('YYYY-MM-DD'), endDate: this.selected.endDate.format('YYYY-MM-DD')}, page.pageIndex + 1, page.pageSize).subscribe(
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
    else {
      this.adminService.fetchApplicantReport(page.pageIndex + 1, page.pageSize).subscribe(
        data => {
          console.log(data);
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
        error => {
          console.log(error)
        }
      );
    }
  }

  onDatesUpdated(e) {
    if(e.startDate) {
      // let diff = e.endDate.diff(e.startDate, 'days');
      this.adminService.filterApplicantReport({startDate: e.startDate.format('YYYY-MM-DD'), endDate: e.endDate.format('YYYY-MM-DD')}, 1, 7).subscribe(
        data => {
          console.log(data)
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
      this.adminService.filterApplicantReport({startDate: this.selected.startDate.format('YYYY-MM-DD'), endDate: this.selected.endDate.format('YYYY-MM-DD')}, 1, diff, 'ASC').subscribe(
        data => {
          if(data.success) {
            let expo = data.stats.rows;
            let options = {
              headers: this.columnTitle
            }
            new ngxCsv(expo, `Applicant User Report${moment().format('MMDDYYYY')}`, options);
          }
        },
        err => {
          console.log(err)
        }
      )
    }
    else {
      this.adminService.fetchApplicantReport(1, this.page.pageSize, 'ASC').subscribe(
        data => {
          if(data.success) {
            let expo = data.stats.rows;
            let options = {
              headers: this.columnTitle
            }
            new ngxCsv(expo, `Applicant User Report${moment().format('MMDDYYYY')}`, options);
          }
        },
        error => {
          console.log(error)
        }
      );
    }
  }

}
