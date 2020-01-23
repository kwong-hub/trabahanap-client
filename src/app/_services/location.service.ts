import { AuthenticationService } from './authentication-service.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { } 

  getCompanyLocations(companyProfileId){
    return this.http.get<any>(`${environment.apiUrl}/employer/locations/${companyProfileId}`);
  }

  

  getAllCities(): Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/location/cities`);
  }

  getAllRegions(): Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/location/regions`);
  }

  getAllCountries(): Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/location/countries`);
  }

  getAllRegionCities(regionId): Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/location/cities/${regionId}`);
  }
}
