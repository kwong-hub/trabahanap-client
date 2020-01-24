import { JobService } from '@app/_services/jobs.service';
import { EmployerService } from './../../../_services/employer.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-candidate-applicant-detail',
  templateUrl: './candidate-applicant-detail.component.html',
  styleUrls: ['./candidate-applicant-detail.component.scss']
})
export class CandidateApplicantDetailComponent implements OnInit {

  applicant: any = {};
  passFilter = false;
  jobId: string = "";
  applicantId: string = "";
  job: any;

  constructor(
    private route: ActivatedRoute, 
    private employerService: EmployerService, 
    private jobService: JobService
  ) { }

  ngOnInit() {

    this.route.paramMap.subscribe(
      success => {
        this.jobId = success.get("jobId");
        this.applicantId = success.get("applicantId");
        const applicantId = success.get('applicantId');
        if(applicantId && this.jobId){
          this.jobService.getJobById(this.jobId).subscribe(
            success => {
              this.job = success.job;
            }
          )
        }
        this.jobService.getFilteredJobApplications(this.jobId)
              .subscribe(
                success => {
                  
                  if(success.success){
                    const applicationIds = success.applicants.map(applicant => applicant.id);
                    this.employerService.getApplicant(applicantId)
                      .subscribe(
                        success => {
                          if(applicationIds.includes(success.applicant.id)){
                            this.passFilter = true;
                          }
                          if(success.applicant){
                            this.applicant = success.applicant;
                          }
                        },
                        err => console.log(err)
                      );
                  }
                },
                err => console.log(err)
              )
      },
      err => console.log(err)
    );
  }

  filterApplicant(){
    this.jobService.filterJobApplication({jobId: this.jobId, applicantId: this.applicantId})
      .subscribe(
        success => {
          if(success.success){
            this.passFilter = !this.passFilter;
          }
         
        },
        err => console.log(err)
      );
  }

}
