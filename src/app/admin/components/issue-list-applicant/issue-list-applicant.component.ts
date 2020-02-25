import { Component, OnInit } from '@angular/core';
import { AdminService } from '@app/_services/admin.service';
import { faReply, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-issue-list-applicant',
  templateUrl: './issue-list-applicant.component.html',
  styleUrls: ['./issue-list-applicant.component.scss']
})
export class IssueListApplicantComponent implements OnInit {
  issues: any = [];
  displayedColumns: string[] = ['issueReason', 'issueType', 'name', 
    'email', 'createdAt', 'responseDate', 'action'];
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
