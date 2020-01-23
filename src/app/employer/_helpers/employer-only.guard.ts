import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '@app/_services/authentication-service.service';

@Injectable({ providedIn: 'root' })
export class EmployerOnlyGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser.role === 'EMPLOYER') {
            // @ts-ignore
            if(route.routeConfig.path !== "profile" && !currentUser.hasFinishedProfile) {
                return this.router.navigate(['/employer/profile']);
            }
            else if(!(route.routeConfig.path == "branches" || route.routeConfig.path == "branches/add")){
                if(currentUser.company_profile){
                    if(!currentUser.company_profile.hasLocations){
                        return this.router.navigate(['/employer/branches/add']);
                    }
                }
            }
            // authorised so return true
            return true;
        }else{
            this.authenticationService.logout();
            return this.router.navigate(['/login']);
        }

    }
}
