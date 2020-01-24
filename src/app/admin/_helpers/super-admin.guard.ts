import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthenticationService } from "@app/_services/authentication-service.service";

@Injectable({
  providedIn: "root"
})
export class SuperAdminGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser.role === "ADMIN") {
      // authorised so return true
      return true;
    } else {
      this.authenticationService.logout();
      this.router.navigate(["/login"]);
      return false;
    }
  }
}
