import { Component, OnInit, Input } from '@angular/core';
import { Job } from '@app/_models/Job';

@Component({
  selector: 'app-job-employer',
  templateUrl: './job-employer.component.html',
  styleUrls: ['./job-employer.component.scss']
})
export class JobEmployerComponent implements OnInit {

  @Input() Job;
  constructor() { }

  ngOnInit() {
  }

}
