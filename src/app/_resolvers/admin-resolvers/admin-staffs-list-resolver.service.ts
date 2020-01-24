import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AdminService } from "@app/_services/admin.service";

@Injectable({
  providedIn: "root"
})
export class AdminStaffsListResolverService {
  constructor(private adminService: AdminService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.adminService.getAdminStaff(1, 8);
  }
}
