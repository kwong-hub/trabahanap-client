import { PaymentService } from './../../_services/payment.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionResolverService {
  constructor(private paymentService: PaymentService) {}

  resolve(): Observable<any> {
    return this.paymentService.getSubscription();
  }
}
