import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '@app/_services/admin.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-issue-detail-container',
  templateUrl: './issue-detail-container.component.html',
  styleUrls: ['./issue-detail-container.component.scss']
})
export class IssueDetailContainerComponent implements OnInit {
  issue: any;
  imageModal: boolean;
  replyIssue: FormGroup;
  submited: boolean;
  successReply: boolean;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public adminService: AdminService,
    private _location: Location
  ) {
    this.route.data.subscribe(res => {
      let data = res.data;
      console.log(data)
      if (data.success) {
        this.issue = data.issue;
      } else {
      }
    });
  }

  ngOnInit() {
    this.replyIssue = this.formBuilder.group({
      issueResponse: ['', Validators.required]
    });
  }

  toggleImageModal() {
    if (this.issue.picture) {
      this.imageModal = !this.imageModal;
    }
  }

  goBack() {
    this._location.back();
  }

  onSubmit() {
    this.submited = true;
    this.successReply = false;
    if (!this.replyIssue.valid) {
      return;
    }

    this.adminService.addIssueResponse({ ...this.replyIssue.value, issueId: this.issue.id }).subscribe(
      data => {
        if (data.success) {
          this.successReply = true;
          this.issue = {
            ...this.issue,
            issueResponseId: data.issueResponse.id,
            issue_response: {
              issueResponse: data.issueResponse.issueResponse
            }
          };
        }
      },
      err => console.log(err)
    );
  }
}
