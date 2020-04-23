import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { EmployerService } from '@app/_services/employer.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentTypeResolverService {
  constructor(private employerResolver: EmployerService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.employerResolver.getPaymentPlanTypes();
  }
}
