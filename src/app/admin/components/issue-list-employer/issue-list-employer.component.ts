import { Component, OnInit } from '@angular/core';
import { AdminService } from '@app/_services/admin.service';
import { faReply, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-issue-list-employer',
  templateUrl: './issue-list-employer.component.html',
  styleUrls: ['./issue-list-employer.component.scss']
})
export class IssueListEmployerComponent implements OnInit {
  issues: any = [];
  displayedColumns: string[] = ['logo', 'issueReason', 'issueType', 'name', 'createdAt', 'responseDate', 'action'];
  faReply = faReply;
  faTimes = faTimes;
  selectedIssue: any;
  detailModal: boolean;
  replySuccess: boolean;
  matPager: any = {
    pageIndex: 0,
    pageSize: 8
  };
  pager: any;
  page: any;
  empty = false;
  hasValues = false;

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
    this.adminService.getAllEmployerIssues(page.pageIndex + 1, page.pageSize).subscribe(
      data => {
        if (data.success == true) {
          this.issues = data.issues.rows;
          this.pager = data.issues.pager;
          this.issues.length == 0 ? (this.empty = true, this.hasValues = false) : (this.hasValues = true, this.empty = false);
          let path = this.location.path();
          if (path.indexOf('page') >= 0 && this.pager.currentPage <= 10) {
            path = path.replace(`?page=${this.pager.currentPage - 1}`, `?page=${this.pager.currentPage.toString()}`);
            this.location.go(path);
          } else if (path.indexOf('page') >= 0 && this.pager.currentPage >= 10) {
            path = path.replace(/page=[0-9][0-9]/, `page=${this.pager.currentPage.toString()}`);
            this.location.go(path);
          }
          else {
            path = path.concat(`?page=${this.pager.currentPage}`);
            this.location.go(path);
          }
          // this.pager.pages = this.renderedPages();
        }
      },
      err => console.log(err)
    );
  }
}
