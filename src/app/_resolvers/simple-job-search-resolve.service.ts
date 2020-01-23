import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { AnonymousService } from "@app/_services/anonymous.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class SimpleJobSearchResolveService implements Resolve<any> {
  constructor(private anonyService: AnonymousService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    let key = route.queryParams.key;
    let city = route.queryParams.city;
    let companyId = route.queryParams.companyId;

    return this.anonyService.searchAllJobs(
      key || "",
      city || "",
      companyId || "",
      1
    );
  }
}
