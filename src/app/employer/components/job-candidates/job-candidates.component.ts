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
  matPager: any = {
    pageIndex: 0,
    pageSize: 5
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
          this.route.queryParams.subscribe(
            data => {
              this.matPager.pageIndex = +data.page - 1 >= 0 ? +data.page - 1 : 0;
              this.getServerData(this.matPager, success.id);
            },
            err => console.log(err)
          );
        }
      },
      err => console.log(err)
    );
  }

  showApplicantDetail(applicant, job) {
    this.router.navigate([`../../../candidates/job/${job.id}/applicant/${applicant.id}`], { relativeTo: this.route });
  }

  getServerData(page, id) {
    this.jobService
      .getJobApplications(id ? id : this.job ? this.job.id : null, page.pageIndex + 1, page.pageSize)
      .subscribe(
        success => {
          if (success.success) {
            this.applicants = success.applicants.rows;
            this.pager = success.applicants.pager;
            this.router.navigate([], {
              relativeTo: this.route,
              queryParams: { page: this.pager.currentPage },
              replaceUrl: true,
              queryParamsHandling: 'merge'
            });
          }
        },
        err => console.log(err)
      );
  }
}
