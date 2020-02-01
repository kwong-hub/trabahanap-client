import { OtherService } from './other.service';
import { AuthenticationService } from './authentication-service.service';
import { LocationService } from './location.service';
import { catchError, mergeMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, EMPTY, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IndustryAndLocationResolverService implements Resolve<any> {
  constructor(
    private locationService: LocationService,
    private authService: AuthenticationService,
    private otherService: OtherService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Observable<never> {
    const data = {};
    //ts-ignore
    return this.locationService.getCompanyLocations(this.authService.currentUserValue.company_profile.id).pipe(
      catchError(error => {
        return EMPTY;
      }),
      mergeMap(value => {
        if (value.success && value.locations) {
          data['locations'] = value.locations;
          return this.otherService.getAllIndustries().pipe(
            catchError(error => {
              return EMPTY;
            }),
            mergeMap(value => {
              if (value.success && value.industries) {
                data['industries'] = value.industries;
                return of(data);
              }
              return EMPTY;
            })
          );
        }
        return EMPTY;
      })
    );
  }
}
