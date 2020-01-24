import { catchError, mergeMap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Observable, EMPTY, of } from "rxjs";
import { ApplicantService } from "./applicant.service";

@Injectable({
  providedIn: "root"
})
export class ApplicantSavedApplicationsResolverService {
  constructor(private applicantService: ApplicantService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Observable<never> {
    return this.applicantService.getSavedJobs(1).pipe(
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
