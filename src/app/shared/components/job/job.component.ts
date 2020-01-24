import { JobService } from "./../../../_services/jobs.service";
import { Router } from "@angular/router";
import { AuthenticationService } from "./../../../_services/authentication-service.service";
import { Job } from "../../../_models/Job";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-job",
  templateUrl: "./job.component.html",
  styleUrls: ["./job.component.scss"]
})
export class JobComponent implements OnInit {
  @Input() Job: Job;
  @Input() isBookMarked: boolean;
  bookmarked: boolean = false;
  userRole;
  imageUrl = `assets/img/pseudo/Logo${Math.floor(Math.random() * 10) + 1}.png`;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private jobsService: JobService
  ) {}

  ngOnInit() {
    this.bookmarked = this.isBookMarked;
    // console.log(this.Job, "job");
    let currentUser = this.authService.currentUserValue;
    currentUser ? (this.userRole = currentUser.role) : (this.userRole = "");
  }

  bookmarkJob() {
    let auth = this.authService.currentUserValue;
    if (auth === null) {
      this.router.navigate(["/login"], {
        queryParams: { returnUrl: `/applicant/jobs/details/${this.Job.jobId}` }
      });
      return false; // to prevent reload
    } else if (!auth.hasFinishedProfile) {
      console.error("has not finished profile");
      return false;
    } else {
      this.jobsService.toggleSaveJob(this.Job.jobId).subscribe(
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
}
