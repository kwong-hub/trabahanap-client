import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AdminService } from '@app/_services/admin.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditPaymentTypeResolverService {
  constructor(private adminService: AdminService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.adminService.getPaymentPlanType(route.paramMap.get('id'));
  }
}
