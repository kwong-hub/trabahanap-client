import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { EmployerService } from '@app/_services/employer.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyApplicationsResolverService {
  constructor(private employerService: EmployerService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    let page = +route.queryParams['page'] > 0 ? +route.queryParams['page'] : 1;
    return this.employerService.getApplications(page);
  }
}
