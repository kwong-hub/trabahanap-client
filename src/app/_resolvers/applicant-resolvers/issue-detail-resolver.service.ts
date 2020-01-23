import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ApplicantService } from '@app/_services/applicant.service';

@Injectable({
  providedIn: 'root'
})
export class IssueDetailResolverService {
  
  constructor(private applicantService: ApplicantService) {  }
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<any> {
    let id = route.params.id;
    return this.applicantService.getIssueById(id);
  }
}