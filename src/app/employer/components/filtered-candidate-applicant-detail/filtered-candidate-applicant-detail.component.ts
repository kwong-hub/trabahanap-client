import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployerService } from '@app/_services/employer.service';
import { JobService } from '@app/_services/jobs.service';

@Component({
  selector: 'app-filtered-candidate-applicant-detail',
  templateUrl: './filtered-candidate-applicant-detail.component.html',
  styleUrls: ['./filtered-candidate-applicant-detail.component.scss']
})
export class FilteredCandidateApplicantDetailComponent implements OnInit {

  applicant: any = {};
  hired = false;
  jobId;
  applicantId;  

  constructor(
    private route: ActivatedRoute, 
    private employerService: EmployerService, 
    private jobService: JobService) { }

  ngOnInit() {

    this.route.paramMap.subscribe(
      success => {
        this.applicantId = success.get('applicantId');
        this.jobId = success.get('jobId');
        if(this.applicantId){
          this.employerService.getApplicant(this.applicantId)
            .subscribe(
              success => {
                //console.log(success)
                if(success.applicant){
                  this.applicant = success.applicant;
                  this.employerService.getIsHired(this.applicantId,this.jobId)
                  .subscribe(
                    data => {
                      this.hired=data.applicant.hired;
                    }
                  )
                  
                }
              },
              err => console.log(err)
            )
        }
      },
      err => console.log(err)
    );
  }

  hireApplicant(){
    //console.log(this.jobId,this.applicantId)
    this.jobService.hireJobApplication({jobId: this.jobId, applicantId: this.applicantId})
      .subscribe(
        success => {
          // console.log(success)
          this.hired = !this.hired;
        },
        err => console.log(err)
      );
  }
}
