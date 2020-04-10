import { Component, OnInit } from '@angular/core';
import { AdminService } from '@app/_services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StateService } from '@app/_services/state.service';
import { Moment } from 'moment';
import * as moment from 'moment';
import { Location } from '@angular/common';
@Component({
  selector: 'app-pwd-company',
  templateUrl: './pwd-company.component.html',
  styleUrls: ['./pwd-company.component.scss']
})
export class PwdCompanyComponent implements OnInit {
  companyId;
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
  displayedColumns: string[] = ['date','companyName','jobTitle', 'vacancy', 'applicant' ,'action'];
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
  rows: any;
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
    this.adminService.getPwdJobs(page.pageIndex + 1, page.pageSize).subscribe(
      success => {
        console.log(success)
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
  
  onDatesUpdated(e) {
    if(e.startDate) {
    // let diff = e.endDate.diff(e.startDate, 'days');
      this.adminService.filterJobReport(this.companyId,{startDate: e.startDate.format('YYYY-MM-DD'), endDate: e.endDate.format('YYYY-MM-DD')}, 1, 7).subscribe(
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


}
