import { Injectable } from '@angular/core';
import { AdminService } from '@app/_services/admin.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminPaymentDetailResolverService {
  constructor(private adminService: AdminService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    let id = route.params.id;
    // console.log(id)
    return this.adminService.getSubscriptionById(id);
  }
}
