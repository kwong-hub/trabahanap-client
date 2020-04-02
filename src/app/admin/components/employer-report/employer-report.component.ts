import { Component, OnInit } from '@angular/core';
import { AdminService } from '@app/_services/admin.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employer-report',
  templateUrl: './employer-report.component.html',
  styleUrls: ['./employer-report.component.scss']
})
export class EmployerReportComponent implements OnInit {

  displayedColumns: string[] = ['date', 'countPerDay'];
  rows;
  matPager: any = {
    pageIndex: 0,
    pageSize: 5
  };
  pager: any;

  constructor(private adminService: AdminService, private route: ActivatedRoute) { }

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
    this.adminService.fetchEmployerReport(page.pageIndex + 1, page.pageSize).subscribe(
      data => {
        console.log(data);
        if(data.success) {
          this.rows = data.stats.rows;
          this.pager = data.stats.pager;
        }
      },
      error => {
        console.log(error)
      }
    )
  }

}
