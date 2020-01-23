import { Component, OnInit } from "@angular/core";
import { AdminService } from "@app/_services/admin.service";
import { faReply, faTimes } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-issue-list-employer",
  templateUrl: "./issue-list-employer.component.html",
  styleUrls: ["./issue-list-employer.component.scss"]
})
export class IssueListEmployerComponent implements OnInit {
  issues: any = [];
  displayedColumns: string[] = [
    "logo",
    "issueReason",
    "issueType",
    "name",
    "action"
  ];
  faReply = faReply;
  faTimes = faTimes;
  selectedIssue: any;
  detailModal: boolean;
  replySuccess: boolean;

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.adminService.getAllEmployerIssues().subscribe(
      data => {
        console.log(data);
        if (data.success) {
          this.issues = data.issues;
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}
