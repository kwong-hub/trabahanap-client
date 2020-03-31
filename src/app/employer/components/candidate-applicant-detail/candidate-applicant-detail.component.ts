import { JobService } from '@app/_services/jobs.service';
import { EmployerService } from './../../../_services/employer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { generateResume } from '../../_helpers/generate-applicant-resume';
import { PaymentService } from '@app/_services/payment.service';
import { AuthenticationService } from '@app/_services/authentication-service.service';
import { longStackSupport } from 'q';

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
  subscription;
  toggleConfirmModal: boolean;
  currentUser: any;
  role: any;
  constructor(
    private route: ActivatedRoute,
    private employerService: EmployerService,
    private jobService: JobService,
    private router: Router,
    private paymentService: PaymentService,
    private _location: Location,
    private authenticationService: AuthenticationService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
    this.role = this.currentUser.role.toLowerCase();
    this.route.data.subscribe(res => {
      let subscriptons = res.subs;
      if (subscriptons.success && res.subs.subscription) {
        this.subscription = subscriptons.subscription;
      } else {
        this.router.navigate([
          `/${this.role}/plan`,
          { data: 'Please buy one of the subscriptions plan to start downloading applicant profile.' }
        ]);
      }
    });
  }

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

  checkSubscription() {
    let today = Date.now();
    if (this.subscription) {
      if (
        (this.subscription.type == 'PREMIUM' || this.subscription.type == 'FREE') &&
        Date.parse(this.subscription.expirationDate) >= today
      ) {
        this.toggleConfirmModal = true;
      } else if (this.subscription.type == 'EXPRESS' && this.subscription.points >= 30) {
        this.toggleConfirmModal = true;
      } else {
        this.router.navigate([
          `/${this.role}/plan`,
          { data: 'Please Upgrade your subscriptions plan to start downloading applicant profile.' }
        ]);
      }
    } else {
      this.router.navigate([
        `/${this.role}/plan`,
        { data: 'Please Upgrade your subscriptions plan to start downloading applicant profile.' }
      ]);
    }
  }

  confirmAction() {
    this.toggleConfirmModal = false;
    const purchased = this.paymentService.purchaseCV(this.subscription.id).subscribe(data => {
      if (data.success) {
        if (this.applicant.cv) {
          //window.location.href = this.applicant.cv;
          window.open(
            this.applicant.cv,
            'download' // <- This is what makes it open in a new window.
          );
        } else {
          this.generatePdf();
        }
      }
    });
  }

  cancelAction() {
    this.toggleConfirmModal = false;
  }
}
