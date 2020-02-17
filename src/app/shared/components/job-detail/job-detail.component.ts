import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { JobService } from '@app/_services/jobs.service';
import { ActivatedRoute, Router } from '@angular/router';
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
import { ApplicantService } from '@app/_services/applicant.service';
import { tileLayer, latLng, marker, icon, Point } from 'leaflet';
import { AuthenticationService } from '@app/_services/authentication-service.service';
import { Role } from '@app/_models/Role';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss']
})
export class JobDetailComponent implements OnInit {
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
  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '...'
      })
    ],
    zoom: 20,
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
    private _location: Location
  ) {
    let currentUser = this.authService.currentUserValue;
    currentUser ? (this.userRole = currentUser.role) : (this.userRole = '');
    this.applicant = currentUser && currentUser.role === Role.applicant;

    this.Route.data.subscribe(res => {
      let data = res.data;
      if (data.success) {
        this.job = data.job;
      } else {
        this.goBack();
      }
    });
    this.tabClicked('detailActive');
    // give a margin to the container only in anonymous view
    this.lower = !this.router.url.includes('applicant');
  }

  ngOnInit() {
    // let id = this.Route.snapshot.params.id;
    this.bookmarked = this.job.saved;
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

    this.jobService.getCompanyJobsApplicant(this.job.companyProfileId).subscribe(
      data => {
        data.jobs.map(job => {
          if (this.job.id != job.id) {
            job.jobId = job.id;
            this.companyJobs.push(job);
          }
        });
      },
      err => console.log(err)
    );
  }
}
