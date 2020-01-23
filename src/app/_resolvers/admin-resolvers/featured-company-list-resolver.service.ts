import { Injectable } from '@angular/core';
import { OtherService } from '@app/_services/other.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeaturedCompanyListResolverService {

  constructor(private otherService: OtherService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<any> {
    return this.otherService.getFeaturedCompanies();
  }
}
