import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployerService } from '@app/_services/employer.service';
import { JobService } from '@app/_services/jobs.service';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { generateResume } from '../../_helpers/generate-applicant-resume';

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
  subscription: any;

  constructor(
    private route: ActivatedRoute,
    private employerService: EmployerService,
    private jobService: JobService,
    private router:Router
  ) {
    this.route.data.subscribe(res => {
      let subscriptons = res.subs;
      if (subscriptons.success) {
        this.subscription = subscriptons.subscription;
      }
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(
      success => {
        this.applicantId = success.get('applicantId');
        this.jobId = success.get('jobId');
        if (this.applicantId) {
          this.employerService.getApplicant(this.applicantId).subscribe(
            success => {
              if (success.applicant) {
                this.applicant = success.applicant;
                this.employerService.getIsHired(this.applicantId, this.jobId).subscribe(data => {
                  this.hired = data.applicant.hired;
                });
              }
            },
            err => console.log(err)
          );
        }
      },
      err => console.log(err)
    );
  }

  hireApplicant() {
    this.jobService.hireJobApplication({ jobId: this.jobId, applicantId: this.applicantId }).subscribe(
      success => {
        this.hired = !this.hired;
      },
      err => console.log(err)
    );
  }

  generatePdf() {
    const documentDefinition = generateResume(this.applicant);
    pdfMake
      .createPdf(documentDefinition)
      .download(this.applicant.user.firstName + ' ' + this.applicant.user.lastName + '  Resume.pdf');
  }

  checkSubscription() {
    if (this.subscription && this.subscription.points > 0 ) {
      this.generatePdf();

    } else {
      this.router.navigate([`/employer/plan`]);
    }
  }

}
