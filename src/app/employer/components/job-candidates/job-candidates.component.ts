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

  applicants: any[] = [];

  constructor(
    private jobService: JobService, 
    private route: ActivatedRoute, 
    private router: Router) { }

  ngOnInit() {

    this.route.params.subscribe(
      success => {
        if(success.id){
          this.jobService.getJobById(success.id)
            .subscribe(
              data => {
                if(data.success && data.job){
                  this.job = data.job;
                }
              },
              err => console.log(err)
            );
          this.jobService.getJobApplications(success.id)
              .subscribe(
                success => {
                  if(success.success){
                    this.applicants = success.applicants;
                  }
                },
                err => console.log(err)
              )
        }
      },
      err => console.log(err)
    );
  }

  showApplicantDetail(applicant, job){
    this.router.navigate([`../../../candidates/job/${job.id}/applicant/${applicant.id}`],{relativeTo: this.route});
  }

}
