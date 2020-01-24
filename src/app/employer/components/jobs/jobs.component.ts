import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from '@app/_services/authentication-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {

  faPlus = faPlus;
  companyProfile;
  jobs: any;
  pager: any;
  constructor(private authService: AuthenticationService, private route: ActivatedRoute) {
    this.route.data.subscribe(
      res => {
        let company = res.company;
        let jobs = res.jobs;
        if(company.success) {
          this.authService.updateCurrentUser(company.employer);
        }
        else {
          console.log(company)
        }

        if(jobs.success) {
          this.jobs = jobs.jobs.rows;
          this.pager = jobs.jobs.pager;
        }
      },
      error => {
        console.log(error)
      }
    )
    this.authService.currentUserSubject.subscribe(
      userValue => {
      
        if(userValue) {
          this.companyProfile = userValue.company_profile;
        }
      }
    )
  }

  ngOnInit() {
  }

}
