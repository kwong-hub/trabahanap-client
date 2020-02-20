import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { JobService } from '@app/_services/jobs.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyJobsResolverService {
  constructor(private jobService: JobService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    let page = +route.queryParams['page'] > 0 ? +route.queryParams['page'] : 1;
    return this.jobService.getCompanyJobs(page, 8);
  }
}
