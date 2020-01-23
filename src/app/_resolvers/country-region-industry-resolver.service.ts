import { Injectable } from '@angular/core';
import { EMPTY, of, Observable } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '@app/_services/authentication-service.service';
import { LocationService } from '@app/_services/location.service';
import { OtherService } from '@app/_services/other.service';

@Injectable({
  providedIn: 'root'
})
export class CountryRegionIndustryResolverService {
  constructor(private locationService: LocationService, private authService: AuthenticationService, private otherService: OtherService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Observable<never> {
    
    const data = {};
    //ts-ignore
    return this.locationService.getAllRegions()
      .pipe(catchError(error => {
        return EMPTY;
      }), mergeMap(value => {
        if(value.success && value.regions){
          data["regions"] = value.regions;
          return this.otherService.getAllIndustries()
            .pipe(catchError(error => {
              return EMPTY;
            }), mergeMap(value => {
              if(value.success && value.industries){
                data["industries"] = value.industries;
                return this.locationService.getAllCountries()
                  .pipe(catchError(error => {
                    return EMPTY;
                  }), mergeMap(value => {
                    if(value.success && value.countries){
                      data["countries"] = value.countries;      
                      return of(data);
                    }
                    return EMPTY;
                  }))
              }
              return EMPTY;
            }))
        }
        return EMPTY;
      }))
  }
}
