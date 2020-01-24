import { Component, OnInit } from "@angular/core";
import { AdminService } from "@app/_services/admin.service";

@Component({
  selector: "app-report-job-list",
  templateUrl: "./report-job-list.component.html",
  styleUrls: ["./report-job-list.component.scss"]
})
export class ReportJobListComponent implements OnInit {
  displayedColumns: string[] = [
    "jobTitle",
    "reportType",
    "comment",
    "name",
    "email",
    "action"
  ];
  reports = [];
  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.adminService.getAllReportedJob().subscribe(data => {
      this.reports = data.reports;
      console.log(this.reports);
    });
  }
}
