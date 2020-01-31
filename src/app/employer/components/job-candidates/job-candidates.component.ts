import { Component, OnInit } from '@angular/core';
import { JobService } from '@app/_services/jobs.service';
import { ActivatedRoute, Router } from '@angular/router';
// import { Route, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-job-candidates',
  templateUrl: './job-candidates.component.html',
  styleUrls: ['./job-candidates.component.scss']
})
export class JobCandidatesComponent implements OnInit {
  job: any;
  pager = {
    pageSize: 5,
    totalItems: 0,
    totalPages: 0,
    currentPage: 0
  };
  displayedColumns: string[] = ['picture', 'name', 'gender', 'applicationDate', 'detail'];
  applicants: any[] = [];

  constructor(private jobService: JobService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(
      success => {
        if (success.id) {
          this.jobService.getJobById(success.id).subscribe(
            data => {
              if (data.success && data.job) {
                this.job = data.job;
              }
            },
            err => console.log(err)
          );
          this.jobService.getJobApplications(success.id, this.pager.currentPage + 1, this.pager.pageSize).subscribe(
            success => {
              if (success.success) {
                this.applicants = success.applicants.rows;
                this.pager = success.applicants.pager;
              }
            },
            err => console.log(err)
          );
        }
      },
      err => console.log(err)
    );
  }

  showApplicantDetail(applicant, job) {
    console.log('Hello');
    this.router.navigate([`../../../candidates/job/${job.id}/applicant/${applicant.id}`], { relativeTo: this.route });
  }

  getServerData(page) {
    this.jobService.getJobApplications(this.job.id, page.pageIndex + 1, page.pageSize).subscribe(
      success => {
        if (success.success) {
          this.applicants = success.applicants.rows;
          this.pager = success.applicants.pager;
        }
      },
      err => console.log(err)
    );
  }
}
