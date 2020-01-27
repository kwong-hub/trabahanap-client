import { Component, OnInit, Input } from "@angular/core";
import { Job } from "@app/_models/Job";
import { AuthenticationService } from "@app/_services/authentication-service.service";
import { Router } from "@angular/router";
import { JobService } from "@app/_services/jobs.service";

@Component({
  selector: "app-anonymous-job",
  templateUrl: "./anonymous-job.component.html",
  styleUrls: ["./anonymous-job.component.scss"]
})
export class AnonymousJobComponent implements OnInit {
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

  bookmarkJob(event) {
    event.stopPropagation();
    let auth = this.authService.currentUserValue;
    if (auth === null) {
      this.router.navigate(["/auth/login"], {
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
