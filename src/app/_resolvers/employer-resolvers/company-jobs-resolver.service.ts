import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { JobService } from '@app/_services/jobs.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyJobsResolverService {

  constructor(private jobService: JobService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<any> {
    return this.jobService.getCompanyJobs(1, 8);
  }
}
