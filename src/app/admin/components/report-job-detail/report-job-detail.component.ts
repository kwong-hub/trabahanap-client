import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AdminService } from '@app/_services/admin.service';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-report-job-detail',
  templateUrl: './report-job-detail.component.html',
  styleUrls: ['./report-job-detail.component.scss']
})
export class ReportJobDetailComponent implements OnInit {
  report: any;
  faCheckCircle = faCheckCircle;
  loading: boolean;

  constructor(private route: ActivatedRoute, public adminService: AdminService) {
    this.route.data.subscribe(res => {
      let data = res.data;
      if (data.success) {
        this.report = data.report;
      } else {
      }
    });
  }
  ngOnInit() {}

  toggleChecked(id) {
    this.loading = true;
    this.adminService.checkedReport(id).subscribe(
      data => {
        this.loading = false;
        if (data.success) {
          this.report = { ...this.report, checked: !this.report.checked };
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}
