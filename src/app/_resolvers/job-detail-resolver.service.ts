import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { JobService } from '@app/_services/jobs.service';
import { AuthenticationService } from '@app/_services/authentication-service.service';
import { Role } from '@app/_models/Role';

@Injectable({
  providedIn: 'root'
})
export class JobDetailResolverService {
  userRole;
  applicant: boolean;

  constructor(private jobService: JobService, private authService: AuthenticationService) {
    let currentUser = this.authService.currentUserValue;
    currentUser ? (this.userRole = currentUser.role) : (this.userRole = '');
    this.applicant = currentUser && currentUser.role === Role.applicant && currentUser.hasFinishedProfile;
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    let id = route.params.id;
    if (this.applicant) {
      return this.jobService.getJobDetailForApplicant(id);
    } else {
      return this.jobService.getJobById(id);
    }
  }
}
