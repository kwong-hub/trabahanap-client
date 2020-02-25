import { Component, OnInit, SimpleChange } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { faUsers, faBuilding, faList } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: "app-issues",
  templateUrl: "./issues.component.html",
  styleUrls: ["./issues.component.scss"]
})
export class IssuesComponent implements OnInit {
  
  faList = faList;
  faBuilding = faBuilding;
  faUsers = faUsers;
  employerIssues;
  applicantIssues;
  newEmployerIssues: any;
  newApplicantIssues: any;
  reportedJobs: any;
  newReportedJobs: any;

  constructor(private Route: ActivatedRoute) {
    this.Route.data.subscribe(res => {
      let data = res.data;
      // console.log(data)
      if(data.success) {
        let stats = data.stats;
        ({ employerIssues: this.employerIssues, 
           newEmployerIssues: this.newEmployerIssues } = stats.employerStats);
        ({ applicantIssues: this.applicantIssues, 
            newApplicantIssues: this.newApplicantIssues } = stats.applicantStats); 
        ({ reportedJobs: this.reportedJobs, 
              newReportedJobs: this.newReportedJobs } = stats.reportStats);
      }
    })
  }

  ngOnInit() {}
}
