import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from '@app/_services/admin.service';

@Injectable({
  providedIn: 'root'
})
export class IssueByIdResolverService {

  constructor(private adminService: AdminService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<any> {
    let id = route.params.id;
    return this.adminService.getIssueById(id);
  }
}
