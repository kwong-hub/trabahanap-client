import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '@app/_services/authentication-service.service';

@Injectable({ providedIn: 'root' })
export class EmployerGuard implements CanActivate {
  constructor(private router: Router, private authenticationService: AuthenticationService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser.role === 'EMPLOYER' || currentUser.role === 'STAFFER') {
      // @ts-ignore
      if (route.routeConfig.path !== 'profile' && !currentUser.hasFinishedProfile) {
        this.router.navigate(['/employer/profile']);
        return false;
      }
      if (!(route.routeConfig.path == 'branches' || route.routeConfig.path == 'branches/add')) {
        if (currentUser.company_profile) {
          if (!currentUser.company_profile.hasLocations) {
            this.router.navigate(['/employer/branches/add']);
            return false;
          }
        }
      }
      // @ts-ignore
      if (route.routeConfig.path == 'jobs/add' && !currentUser.company_profile.verified) {
        this.router.navigate(['/employer/jobs']);
        return false;
      }
      // authorised so return true
      return true;
    }
  }
}
