import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '@app/_services/authentication-service.service';
import { map } from 'rxjs/operators';

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
            if (!currentUser.firstName) {
                return this.authenticationService.getUserByToken(currentUser.token).pipe(map(
                    data => {
                        // console.log(data.user);
                        this.authenticationService.currentUserSubject.next({ ...data.user, token: currentUser.token })
                        if (route.routeConfig.path !== "profile" && !data.user.hasFinishedProfile) {
                            this.router.navigate(['/applicant/profile']);
                            return true;
                        }
                        return true;
                    }));
            } else {
                if (route.routeConfig.path !== "profile" && !currentUser.hasFinishedProfile) {
                    this.router.navigate(['/applicant/profile']);
                    return true;
                }
                return true;
            }



        } else {
            return false;
        }


    }
}
