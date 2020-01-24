import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { JobService } from "@app/_services/jobs.service";

@Injectable({
  providedIn: "root"
})
export class FilteredCandidatesResolverService {
  constructor(private jobService: JobService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.jobService.getFilteredJobWithApplications(1, 8);
  }
}
