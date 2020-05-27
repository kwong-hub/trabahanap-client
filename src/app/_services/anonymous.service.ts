import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnonymousService {
  constructor(private http: HttpClient) {}

  searchCities(term): Observable<any> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<any>(`${environment.apiUrl}/cities?search=${term}`);
  }

  searchIndustries(term): Observable<any> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<any>(`${environment.apiUrl}/search/industry?search=${term}`);
  }

  jobSimpleSearch(key, city): Observable<any> {
    return this.http.get(`${environment.apiUrl}/search?key=${key}&city=${city}`);
  }

  getCityCount(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/search/count/location`);
  }

  searchJobByProximity(lat=14.6042, long=120.9822, distance, term,page): Observable<any> {
    return this.http.get(
      `${environment.apiUrl}/search/location?lat=${lat}&long=${long}&distance=${distance}&key=${term}&page=${page}`
    );
  }
  searchAllJobs(key, city, companyId, page): Observable<any> {
    return this.http.get<any>(
      `${environment.apiUrl}/search?key=${key}&cityName=${city}&page=${page}&compId=${companyId}`
    );
  }
  advancedSearch(key, industry, employtype, salaryRange, cityName, pwd, page) {
    // console.log(arguments)
    return this.http.get<any>(
      `${environment.apiUrl}/search/advanced?search=${key}&et=${employtype}&industry=${industry}&sr=${salaryRange}&ct=${cityName}&pwd=${pwd}&page=${page}`
    );
  }
  getCompanyByProfileId(id) {
    return this.http.get<any>(`${environment.apiUrl}/company/${id}`);
  }
  getAdvertisement() {
    return this.http.get<any>(`${environment.apiUrl}/ads`);
  }
}
