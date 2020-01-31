// import { Job } from './../_models/Job.ts';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '@environments/environment';

@Injectable()
export class JobService {
  constructor(private http: HttpClient) {}

  getAllJobs(page): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/search?page=${page}`);
  }

  searchAllJobs(key, city, page): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/search?key=${key}&city=${city}&page=${page}`);
  }

  getCompanyJobs(page, pageSize): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/employer/jobs?page=${page}&pageSize=${pageSize}`);
  }

  getJobById(id): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/jobs/${id}`);
  }

  getJobDetailForApplicant(id): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/applicant/jobs/${id}`);
  }

  getJobCandidates(jobId): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/employer/jobs/applications`, { JobId: jobId });
  }

  getJobWithApplications(page, pageSize): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/employer/jobs/applications?page=${page}&pageSize=${pageSize}`);
  }

  getFilteredJobWithApplications(page, pageSize): Observable<any> {
    return this.http.get<any>(
      `${environment.apiUrl}/employer/jobs/filtered/applications?page=${page}&pageSize=${pageSize}`
    );
  }

  getJobApplications(id, page, pageSize): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/employer/jobs/applicants/${id}?page=${page}&pageSize=${pageSize}`);
  }

  getFilteredJobApplications(id): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/employer/jobs/filtered/applicants/${id}`);
  }

  toggleSaveJob(JobId): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/applicant/jobs/save`, {
      JobId
    });
  }

  getApplicantSavedJobs(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/applicant/jobs/saved/all`);
  }

  filterJobApplication(body): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/employer/jobs/applications/filter`, body);
  }

  hireJobApplication(body): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/employer/jobs/applications/hire`, body);
  }
}
