import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class OtherService {

  constructor(private http: HttpClient) { }

  getAllIndustries(): Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/other/industries`);
  }

  addStaffer(staffer): Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/employer/staff/add`, staffer);
  }

  getStaffs(): Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/employer/staff`);
  }

  getAllIssues(): Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/admin/issues`);
  }

  addIssueResponse(issueResponse): Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/admin/issue_responses`, issueResponse);
  }

  getFeaturedCompanies(): Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/employers/featured`);
  }

  toggleFeaturedCompany(id): Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/admin/employers/featured/${id}/toggle`);
  }
}
