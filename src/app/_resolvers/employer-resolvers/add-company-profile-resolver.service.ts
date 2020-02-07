import { Injectable } from '@angular/core';
import { EmployerService } from '@app/_services/employer.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddCompanyProfileResolverService {

  constructor(private employerService:EmployerService) { }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.employerService.getCompanyProfile();
  }
}
