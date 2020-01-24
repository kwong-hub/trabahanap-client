import { Injectable } from "@angular/core";
import { EmployerService } from "@app/_services/employer.service";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class IssueDetailResolverService {
  constructor(private employerService: EmployerService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    let id = route.params.id;
    return this.employerService.getIssueById(id);
  }
}
