import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(
    private route: ActivatedRoute,
    private employerService: EmployerService,
    private jobService: JobService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(
      success => {
        this.applicantId = success.get('applicantId');
        this.jobId = success.get('jobId');
        if (this.applicantId) {
          this.employerService.getApplicant(this.applicantId).subscribe(
            success => {
              //console.log(success)
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
    //console.log(this.jobId,this.applicantId)
    this.jobService.hireJobApplication({ jobId: this.jobId, applicantId: this.applicantId }).subscribe(
      success => {
        // console.log(success)
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
}
