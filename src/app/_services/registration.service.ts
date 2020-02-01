import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  userData: any = 'kaleb';

  constructor(private http: HttpClient) {}

  registerEmployer(employer) {
    return this.http.post(`${environment.apiUrl}/auth/employer_signup`, employer).pipe(
      map(data => {
        return data;
      })
    );
  }

  registerApplicant(applicant) {
    return this.http.post(`${environment.apiUrl}/auth/applicant_signup`, applicant).pipe(
      map(data => {
        return data;
      })
    );
  }
}
