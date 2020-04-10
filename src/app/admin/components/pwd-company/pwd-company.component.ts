import { Component, OnInit } from '@angular/core';
import { AdminService } from '@app/_services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StateService } from '@app/_services/state.service';

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

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router,
    private stateService: StateService
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

}
