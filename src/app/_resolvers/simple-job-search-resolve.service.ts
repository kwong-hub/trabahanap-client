import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { AnonymousService } from "@app/_services/anonymous.service";
import { Observable } from "rxjs";
import { AuthenticationService } from '@app/_services/authentication-service.service';

@Injectable({
  providedIn: "root"
})
export class SimpleJobSearchResolveService implements Resolve<any> {
  constructor(private anonyService: AnonymousService,private authenticationService:AuthenticationService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    let key = route.queryParams.key;
    let city = route.queryParams.city;
    let companyId = route.queryParams.companyId;
    const currentUser = this.authenticationService.currentUserValue;

    // this.authenticationService.getUserByToken(currentUser.token).subscribe(
    //   data => {
    //       this.authenticationService.currentUserSubject.next({ ...data.user, token: currentUser.token })
    //   });

      return this.anonyService.searchAllJobs(
        key || "",
        city || "",
        companyId || "",
        1
      );
  }
}
