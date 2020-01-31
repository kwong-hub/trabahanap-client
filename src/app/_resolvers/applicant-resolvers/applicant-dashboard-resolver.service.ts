import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { EmployerService } from '@app/_services/employer.service';
import { Observable } from 'rxjs';
import { ApplicantService } from '@app/_services/applicant.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicantDashboardResolverService {

  constructor(private applicantServices:ApplicantService ) { }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.applicantServices.fetchDashboardCounter();
  }
}
