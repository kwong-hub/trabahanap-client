import { JobService } from '@app/_services/jobs.service';
import { EmployerService } from './../../../_services/employer.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { generateResume } from '../../_helpers/generate-applicant-resume';

@Component({
  selector: 'app-candidate-applicant-detail',
  templateUrl: './candidate-applicant-detail.component.html',
  styleUrls: ['./candidate-applicant-detail.component.scss']
})
export class CandidateApplicantDetailComponent implements OnInit {
  applicant: any = {};
  passFilter = false;
  jobId: string = '';
  applicantId: string = '';
  job: any;
  pdfMake = pdfMake;

  constructor(
    private route: ActivatedRoute,
    private employerService: EmployerService,
    private jobService: JobService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(
      success => {
        this.jobId = success.get('jobId');
        this.applicantId = success.get('applicantId');
        const applicantId = success.get('applicantId');
        if (applicantId && this.jobId) {
          this.jobService.getJobById(this.jobId).subscribe(success => {
            this.job = success.job;
          });
        }
        this.jobService.getFilteredJobApplications(this.jobId).subscribe(
          success => {
            if (success.success) {
              const applicationIds = success.applicants.map(applicant => applicant.id);

              this.employerService.getApplicant(applicantId).subscribe(
                success => {
                  if (success.success) {
                    //const applicationIds = success.applicant.map(applicant => applicant.id);
                    this.employerService.getApplicant(applicantId).subscribe(
                      success => {
                        if (applicationIds.includes(success.applicant.id)) {
                          this.passFilter = true;
                        }
                        if (success.applicant) {
                          this.applicant = success.applicant;
                        }
                      },
                      err => console.log(err)
                    );
                  }
                },
                err => console.log(err)
              );
            }
          },
          err => console.log(err)
        );
      },
      err => console.log(err)
    );
  }

  filterApplicant() {
    this.jobService
      .filterJobApplication({
        jobId: this.jobId,
        applicantId: this.applicantId
      })
      .subscribe(
        success => {
          if (success.success) {
            this.passFilter = !this.passFilter;
          }
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
