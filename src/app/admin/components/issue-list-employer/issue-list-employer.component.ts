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

  constructor(private adminService: AdminService, private Route: ActivatedRoute, private _location: Location) {
    this.Route.data.subscribe(res => {
      let data = res.data;
      if(data.success) {
        this.issues = data.issues;
      }
      else {
        this._location.back();
      }
    })
  }

  ngOnInit() { }
}
