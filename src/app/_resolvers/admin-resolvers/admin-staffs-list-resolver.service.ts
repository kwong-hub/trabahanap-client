import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from '@app/_services/admin.service';

@Injectable({
  providedIn: 'root'
})
export class AdminStaffsListResolverService {
  constructor(private adminService: AdminService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    let page = +route.queryParams['page'] > 0 ? +route.queryParams['page'] : 1;
    return this.adminService.getAdminStaff(page, 8);
  }
}
