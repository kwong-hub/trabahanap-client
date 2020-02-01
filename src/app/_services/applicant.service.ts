import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApplicantService {
  constructor(private http: HttpClient) {}

  fetchDashboardCounter(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/applicant/counters`);
  }

  addApplicantProfileWithCV(applicantProfile): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/applicant/profile`, applicantProfile);
  }

  getJobApplications(page, pageSize): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/applicant/jobs?page=${page}&pageSize=${pageSize}`);
  }

  getApplicantProfile() {
    return this.http.get<any>(`${environment.apiUrl}/applicant/profile`);
  }

  getSavedJobs(page, pageSize): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/applicant/jobs/saved?page=${page}&pageSize=${pageSize}`);
  }

  applyToJob(job): Observable<any> {
    let jobId = { JobId: job };
    return this.http.post<any>(`${environment.apiUrl}/applicant/jobs/apply`, jobId);
  }

  editApplicantProfile(applicantProfile, id): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/applicant/profile/${id}`, applicantProfile);
  }

  changeApplicantCV(formData): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/applicant/profile/cv`, formData);
  }

  changeApplicantPicture(formData): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/applicant/profile/picture`, formData);
  }

  sendIssue(formData): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/applicant/issues`, formData);
  }

  getAllIssues(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/applicant/issues`);
  }

  getIssueById(id): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/applicant/issues/${id}`);
  }

  deleteIssue(id): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/applicant/issue/${id}`);
  }
  getFilterSavedJobs(jobtitle, industry, company, page): Observable<any> {
    return this.http.get<any>(
      `${environment.apiUrl}/applicant/filter/jobs/saved?job=${jobtitle}&industry=${industry}&company=${company}&page=${page}`
    );
  }
  getFilterAppliedJobs(jobtitle, industry, company, page): Observable<any> {
    return this.http.get<any>(
      `${environment.apiUrl}/applicant/filter/jobs/applications?job=${jobtitle}&industry=${industry}&company=${company}&page=${page}`
    );
  }

  reportJob(data, id): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/applicant/reports/${id}`, data);
  }
}
