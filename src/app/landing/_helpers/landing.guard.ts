import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '@app/_services/authentication-service.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LandingGuard implements CanActivate {
  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let currentUser = this.authenticationService.currentUserValue;
    if (!currentUser.firstName) {
      return this.authenticationService.getUserByToken(currentUser.token).pipe(map(
        data => {
          this.authenticationService.currentUserSubject.next({ ...data.user, token: currentUser.token })
          console.log(currentUser,'curr')
          return true;
        }
      )
        );
       
    } else {
      return true;
    }

  }

}
