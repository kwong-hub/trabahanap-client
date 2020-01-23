import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '@app/_services/authentication-service.service';

@Injectable({ providedIn: 'root' })
export class ApplicantGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser && currentUser.role === 'APPLICANT') {
            // @ts-ignore
            if(route.routeConfig.path !== "profile" && !currentUser.hasFinishedProfile) {
                this.router.navigate(['/applicant/profile']);
            }
            return true;
        }else{
            return false;
        }


    }
}