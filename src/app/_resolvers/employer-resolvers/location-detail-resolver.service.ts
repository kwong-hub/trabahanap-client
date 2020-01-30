import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { EmployerService } from '@app/_services/employer.service';

@Injectable({
  providedIn: 'root'
})
export class LocationDetailResolverService {

  constructor(private employerService: EmployerService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    let id = route.params.id;
    return this.employerService.getCompanyLocationById(id);
  }
}