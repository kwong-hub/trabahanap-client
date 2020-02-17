import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  data: any;
  jobs: any;

  constructor() {}

  pushJobs(jobs) {
    this.jobs = jobs;
  }
}
