import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Job } from '@app/_models/Job';
import { JobService } from '@app/_services/jobs.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
  public jobs: [];
  public pager: any;
  public page: any;
  userRole;

  constructor(private route: ActivatedRoute, private router: Router, private JobsService: JobService) {}

  ngOnInit() {
    this.JobsService.getAllJobs(1).subscribe(data => {
      this.jobs = data.jobs;
    });
  }
}
