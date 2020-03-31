import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  constructor(private http: HttpClient) {}

  getSubscription(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/employer/subscription`);
  }

  purchaseCV(id): Observable<any> {
    return this.http.post(`${environment.apiUrl}/employer/subscription/purchase/${id}`, {});
  }
  puchasePlan(data): Observable<any> {
    return this.http.post(`${environment.apiUrl}/employer/subscription`, data);
  }

  adminPuchasePlan(data): Observable<any> {
    return this.http.post(`${environment.apiUrl}/admin/subscriptions`, data);
  }
  getEmployerPaymentInfo(id, page, pageSize) {
    return this.http.get<any>(
      `${environment.apiUrl}/employer/subscription/company/${id}?page=${page}&pageSize=${pageSize}`
    );
  }
}
