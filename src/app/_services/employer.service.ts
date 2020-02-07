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
export class EmployerService {
  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {}

  fetchDashboardCounter(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/employer/counters`);
  }

  getCompanyProfile(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/employer/profile`);
  }

  addCompanyProfile(companyProfile): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/employer/profile`, companyProfile);
  }

  editCompanyProfile(companyProfile, id): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/employer/profile/${id}`, companyProfile);
  }

  addEmployerJob(job): Observable<any> {
    return this.http.post(`${environment.apiUrl}/employer/jobs`, job);
  }

  editEmployerJob(id, job): Observable<any> {
    return this.http.put(`${environment.apiUrl}/employer/jobs/${id}`, job);
  }

  deleteEmployerJob(id): Observable<any> {
    return this.http.put(`${environment.apiUrl}/employer/jobs/delete/${id}`, {});
  }

  suspendJob(id): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/employer/jobs/cancel/${id}`, {});
  }

  addCompanyBranch(companyLocation): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/employer/location`, companyLocation);
  }
  getCompanyLocations(): Observable<any> {
    //@ts-ignore
    let { companyProfileId } = this.authenticationService.currentUserValue;

    return this.http.get<any>(`${environment.apiUrl}/employer/locations/${companyProfileId}`);
  }

  getCompanyLocationsForAdmin(companyProfileId) {
    return this.http.get<any>(`${environment.apiUrl}/employer/locations/${companyProfileId}`);
  }

  getHeadLocation() {
    return this.http.get<any>(`${environment.apiUrl}/employer/profile/locations/heads`)
  }

  getCompanyLocationById(id): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/employer/profile/locations/${id}`);
  }

  editCompanyBranch(companyLocation, id): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/employer/profile/locations/${id}`, companyLocation);
  }

  editCompanyBranchPicture(companyImage, id): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/employer/profile/locations/picture/${id}`, companyImage);
  }

  addCompanyProfileWithFile(formData: FormData): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/employer/profile`, formData);
  }

  changeCompanyLogo(formData: FormData): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/employer/profile/logo`, formData);
  }

  chnageBusinessLicense(formData: FormData): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/employer/profile/businessLicense`, formData);
  }

  getApplicant(id) {
    return this.http.get<any>(`${environment.apiUrl}/employer/jobs/applications/applicant/${id}`);
  }

  getIsHired(id, jobId) {
    return this.http.get<any>(`${environment.apiUrl}/employer/jobs/applications/applicant/hired/${id}/${jobId}`);
  }
  sendIssue(formData): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/employer/issues`, formData);
  }

  getAllIssues(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/employer/issues`);
  }

  getIssueById(id): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/employer/issues/${id}`);
  }

  deleteIssue(id): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/employer/issue/${id}`);
  }

  getFilterJobsApplications(jobtitle,industry,position,active,page,pageSize){
    return this.http.get<any>(`${environment.apiUrl}/employer/filter/jobs/applications?job=${jobtitle}&industry=${industry}&position=${position}&active=${active}&page=${page}&pageSize=${pageSize}`);
  }
  
  getFilterJobsFilteredApplications(jobtitle,industry,position,active,page,pageSize){
    return this.http.get<any>(`${environment.apiUrl}/employer/filter/filtered/applications?job=${jobtitle}&industry=${industry}&position=${position}&active=${active}&page=${page}&pageSize=${pageSize}`);
  }

  getApplications(page) {
    return this.http.get<any>(`${environment.apiUrl}/employer/applications?page=${page}`);
  }

  getFilterApplications(applicantName, job, page, pageSize) {
    return this.http.get<any>(
      `${environment.apiUrl}/employer/filter/applications?applicant=${applicantName}&job=${job}&page=${page}&pageSize=${pageSize}`
    );
  }
  getJobsFilter(jobtitle, industry, position, page, pageSize) {
    return this.http.get<any>(
      `${environment.apiUrl}/employer/filter/jobs?job=${jobtitle}&industry=${industry}&position=${position}&page=${page}&pageSize=${pageSize}`
    );
  }
}
