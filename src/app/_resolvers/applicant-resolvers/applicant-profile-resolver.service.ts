import { ApplicantService } from './../../_services/applicant.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '@app/_services/authentication-service.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicantProfileResolverService {

  constructor(private applicantService: ApplicantService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<any> {
    return this.applicantService.getApplicantProfile();
  }
}
