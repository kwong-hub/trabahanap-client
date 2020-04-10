import { Component, OnInit } from '@angular/core';
import { AdminService } from '@app/_services/admin.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Moment } from 'moment';
import * as moment from 'moment';
import { ngxCsv } from 'ngx-csv/ngx-csv';

@Component({
  selector: 'app-employer-report',
  templateUrl: './employer-report.component.html',
  styleUrls: ['./employer-report.component.scss']
})
export class EmployerReportComponent implements OnInit {

  displayedColumns: string[] = ['date', 'countPerDay', 'subTotal', 'activeUsers', 'returningUsers', 'toBeVerified', 
    'verifiedPerDay', 'loginPerDay'];
  columnTitle: string[] = ['Date', 'Daily Registrations', 'Total Registrations', 'Active Users', 
    'Returning Users', 'Number of Employers to be Verified', 'Number of Verified Employers', 'Daily Logins']
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

  constructor(private adminService: AdminService, private route: ActivatedRoute, 
    private location: Location) { }

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
    if(this.filtered) {
      this.adminService.filterEmployerReport({startDate: this.selected.startDate.format('YYYY-MM-DD'), endDate: this.selected.endDate.format('YYYY-MM-DD')}, page.pageIndex + 1, page.pageSize).subscribe(
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
      this.adminService.fetchEmployerReport(page.pageIndex + 1, page.pageSize).subscribe(
        data => {
          if(data.success) {
            console.log(data.stats)
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
      this.adminService.filterEmployerReport({startDate: e.startDate.format('YYYY-MM-DD'), endDate: e.endDate.format('YYYY-MM-DD')}, 1, 7).subscribe(
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
      // this.getServerData(this.matPager)
    }
  }

  exportCSV() {
    if(this.filtered) {
      let diff = this.selected.endDate.diff(this.selected.startDate, 'days') + 1;
      this.adminService.filterEmployerReport({startDate: this.selected.startDate.format('YYYY-MM-DD'), endDate: this.selected.endDate.format('YYYY-MM-DD')}, 1, diff, 'ASC').subscribe(
        data => {
          if(data.success) {
            let expo = data.stats.rows;
            let options = {
              headers: this.columnTitle
            }
            new ngxCsv(expo, 'My Report', options);
          }
        },
        err => {
          console.log(err)
        }
      )
    }
    else {
      this.adminService.fetchEmployerReport(1, 100, 'ASC').subscribe(
        data => {
          if(data.success) {
            let expo = data.stats.rows;
            let options = {
              headers: this.columnTitle
            }
            new ngxCsv(expo, 'My Report', options);
          }
        },
        error => {
          console.log(error)
        }
      );
    }
  }
}