// import { Injectable } from '@angular/core';
// import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// import { AuthenticationService } from '@app/_services/authentication-service.service';

// @Injectable({ providedIn: 'root' })
// export class EmployerGuard implements CanActivate {
//     constructor(
//         private router: Router,
//         private authenticationService: AuthenticationService
//     ) { }

//     canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//         const currentUser = this.authenticationService.currentUserValue;
//         if (currentUser.role === 'EMPLOYER') {
//             //@ts-ignore
//             if(route.routeConfig.path !== "profile" && !currentUser.hasFinishedProfile) {
//                 this.router.navigate(['/employer/profile']);
//             }
//             // authorised so return true
//             return true;
//         }

//     }
// }
