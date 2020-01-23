import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { OtherService } from '@app/_services/other.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyStaffResolverService {

  constructor(private otherService: OtherService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<any> {
    return this.otherService.getStaffs()
  }
}
