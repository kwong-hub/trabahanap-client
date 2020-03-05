import { AnonymousService } from './../../../_services/anonymous.service';
import { Component, OnInit } from '@angular/core';
import {
  faCheckCircle,
  faMapMarkerAlt,
  faTag,
  faExternalLinkAlt,
  faToolbox,
  faClock,
  faArrowLeft,
  faBookOpen,
  faBuilding,
  faListUl
} from '@fortawesome/free-solid-svg-icons';
import { tileLayer, latLng, marker, icon, Point } from 'leaflet';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '@app/_services/authentication-service.service';
import { ApplicantService } from '@app/_services/applicant.service';
import { JobService } from '@app/_services/jobs.service';
import { Role } from '@app/_models/Role';
import { Location } from '@angular/common';
import { Job } from '@app/_models/Job';

@Component({
  selector: 'app-landing-job-detail',
  templateUrl: './landing-job-detail.component.html',
  styleUrls: ['./landing-job-detail.component.scss']
})
export class LandingJobDetailComponent implements OnInit {
  job;
  faToolbox = faToolbox;
  faClock = faClock;
  faCheckCircle = faCheckCircle;
  faMapMarkerAlt = faMapMarkerAlt;
  faTag = faTag;
  faExternalLinkAlt = faExternalLinkAlt;
  faArrowLeft = faArrowLeft;
  faBookOpen = faBookOpen;
  faBuilding = faBuilding;
  faListUl = faListUl;
  showModal: boolean;
  tabs: any = {};
  companyJobs = [];
  public tempJobs: Job[] = [];
  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '...'
      })
    ],
    zoom: 15,
    center: latLng(14.6042, 120.9822),
    attributionControl: false
  };
  marker;
  applicant: boolean = false;
  bookmarked: boolean;
  userRole: string;
  lower: boolean;
  // imageUrl = `assets/img/pseudo/Logo${Math.floor(Math.random() * 10) + 1}.png`;

  constructor(
    private router: Router,
    private Route: ActivatedRoute,
    private authService: AuthenticationService,
    private applicantService: ApplicantService,
    private jobService: JobService,
    private _location: Location,
    private anonymousService: AnonymousService
  ) {
    let currentUser = this.authService.currentUserValue;
    currentUser ? (this.userRole = currentUser.role) : (this.userRole = '');
    this.applicant = currentUser && currentUser.role === Role.applicant;

    this.Route.data.subscribe(res => {
      let data = res.data;
      if (data.success) {
        this.job = data.job;
      }
    });
    this.tabClicked('detailActive');
    // give a margin to the container only in anonymous view
    this.lower = !this.router.url.includes('applicant');
  }

  ngOnInit() {
    // let id = this.Route.snapshot.params.id;
    this.bookmarked = this.job ? this.job.saved : null;
    if (this.job.location) {
      let { latitude, longitude } = this.job.location;
      this.options.center = latLng(latitude, longitude);
      this.marker = marker([latitude, longitude], {
        icon: icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: 'assets/marker-icon.png',
          shadowUrl: 'assets/marker-shadow.png'
        }),
        draggable: false,
        autoPan: true,
        autoPanPadding: new Point(70, 70)
      });
    }
  } // ngOnInit ends here

  apply(jobId) {
    let auth = this.authService.currentUserValue;
    if (auth === null) {
      this.router.navigate(['/auth/login'], {
        queryParams: { returnUrl: `/applicant/jobs/details/${jobId}` }
      });
      return false; // to prevent reload
    }
    this.showModal = false;
    this.applicantService.applyToJob(this.job.id).subscribe(
      data => {
        if (data.success) {
          this.showModal = true;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  bookmarkJob(jobId) {
    let auth = this.authService.currentUserValue;

    if (auth === null) {
      this.router.navigate(['/auth/login'], {
        queryParams: { returnUrl: `/applicant/jobs/details/${jobId}` }
      });
      return false; // to prevent reload
    } else if (!auth.hasFinishedProfile) {
      return false;
    } else if (auth.role === Role.applicant) {
      this.jobService.toggleSaveJob(jobId).subscribe(
        data => {
          if (data.success) {
            this.bookmarked = !this.bookmarked;
          }
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  loadJobsForNoResults() {
    this.anonymousService.advancedSearch('', '', '', '', '', 0, 1).subscribe(data => {
      if (data.jobs.rows.length > 0) {
        this.tempJobs.push(...data.jobs.rows);
      }
    });
  }

  goBack() {
    this._location.back();
  }

  tabClicked(tab) {
    this.tabs = {};
    this.tabs[tab] = true;
  }

  getCompanyJobs() {
    this.tabClicked('otherActive');
    this.companyJobs = [];
    this.jobService.getCompanyJobsAnonymous(this.job.companyProfileId).subscribe(
      data => {
        data.jobs.map(job => {
          if (this.job.id != job.id) {
            job.jobId = job.id;
            this.companyJobs.push(job);
          }
        });

        if (this.companyJobs.length == 0) {
          this.loadJobsForNoResults();
        }
      },
      err => console.log(err)
    );
  }
}
