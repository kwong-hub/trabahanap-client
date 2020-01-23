import { Component, OnInit } from '@angular/core';
import { AdminService } from '@app/_services/admin.service';
import { faReply, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-issue-list-applicant',
  templateUrl: './issue-list-applicant.component.html',
  styleUrls: ['./issue-list-applicant.component.scss']
})
export class IssueListApplicantComponent implements OnInit {
  
  issues: any = [];
  displayedColumns: string[] = ['issueReason', 'issueType', 'name', 'email', 'action'];
  faReply = faReply;
  faTimes = faTimes;
  selectedIssue: any;
  detailModal: boolean;
  replySuccess: boolean;
  
  constructor(private adminService : AdminService) { }

  ngOnInit() {
    this.adminService.getAllApplicantIssues().subscribe(
      data => {
        console.log(data)
        if(data.success) {
          this.issues = data.issues;
        }
      },
      error => {
        console.log(error)
      }
    )
  }

}
