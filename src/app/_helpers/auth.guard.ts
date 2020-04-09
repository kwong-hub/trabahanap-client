import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { AuthenticationService } from '@app/_services/authentication-service.service';
import { first } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  public token = localStorage.getItem('token');
  constructor(private router: Router, private authenticationService: AuthenticationService) {
    // console.log(this.token)
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {
      var decodedToken = jwt_decode(currentUser.token);
      if (decodedToken.exp * 1000 < Date.now()) {
        this.router.navigate(['auth/login'], { queryParams: { returnUrl: state.url } });
      }
      // check if route is restricted by role
      if (route.data.roles && route.data.roles.indexOf(currentUser.role) === -1) {
        // role not authorised so redirect to home page
        //console.log("Hello from can actvate");
        this.router.navigate([`/${currentUser.role.toLowerCase()}/home`]);
        return false;
      }
      // authorised so return true
      return true;
    } else {
      // not logged in so redirect to login page with the return url
      this.router.navigate(['auth/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }
}
