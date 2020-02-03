import { Component, OnInit } from '@angular/core';
import { faCheckCircle, faMapMarkerAlt, faTag, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { tileLayer, latLng, marker, icon, Point } from 'leaflet';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '@app/_services/authentication-service.service';
import { ApplicantService } from '@app/_services/applicant.service';
import { JobService } from '@app/_services/jobs.service';
import { Role } from '@app/_models/Role';
import { Location } from '@angular/common';

@Component({
  selector: 'app-landing-job-detail',
  templateUrl: './landing-job-detail.component.html',
  styleUrls: ['./landing-job-detail.component.scss']
})
export class LandingJobDetailComponent implements OnInit {
  job;
  faCheckCircle = faCheckCircle;
  faMapMarkerAlt = faMapMarkerAlt;
  faTag = faTag;
  faExternalLinkAlt = faExternalLinkAlt;
  showModal: boolean;
  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '...'
      })
    ],
    zoom: 20,
    center: latLng(14.6042, 120.9822)
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
      //console.log(res)
      if (data.success) {
        this.job = data.job;
      } else {
        this.goBack();
      }
    });

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
    this.applicantService.applyToJob(this.job.id).subscribe(
      data => {
        if (data.success) {
          this.modal();
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  modal() {
    this.showModal = true;
    setTimeout(() => {
      this.showModal = false;
      this.router.navigate(['applicant/applications']);
    }, 2500);
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
}
