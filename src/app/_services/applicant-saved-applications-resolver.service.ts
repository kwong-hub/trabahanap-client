import { catchError, mergeMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, EMPTY, of } from 'rxjs';
import { ApplicantService } from './applicant.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicantSavedApplicationsResolverService {
  constructor(private applicantService: ApplicantService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Observable<never> {
    let page = +route.queryParams['page'] > 0 ? +route.queryParams['page'] : 1;
    return this.applicantService.getSavedJobs(page, 5).pipe(
      catchError(error => {
        return EMPTY;
      }),
      mergeMap(value => {
        if (value.success && value.jobs) {
          return of(value.jobs);
        }
        return EMPTY;
      })
    );
  }
}
