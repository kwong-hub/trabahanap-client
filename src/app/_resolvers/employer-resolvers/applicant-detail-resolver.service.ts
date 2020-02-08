import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentService } from '@app/_services/payment.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApplicantDetailResolverService {

  constructor(private paymentService: PaymentService, private router: Router) { }

  resolve(): Observable<any> {
    return this.paymentService.getSubscription();
      
  }
}
