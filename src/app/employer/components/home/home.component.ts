import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { EmployerService } from "@app/_services/employer.service";
import { AuthenticationService } from '@app/_services/authentication-service.service';

@Component({
  selector: "employer-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  dashboardItem1 = {
    value: "",
    description: "Active Jobs",
    percent: "50%",
    route: "jobs"
  };
  dashboardItem2 = {
    value: "",
    description: "Applicants",
    percent: "30%",
    route: "candidates"
  };
  dashboardItem3 = {
    value: "",
    description: "Filtered Candidates",
    percent: "10%",
    route: "filtered_candidates"
  };
  dashboardItem4 = {
    value: "",
    description: "Staff",
    percent: "10%",
    route: ""
  };
  constructor(private Route: ActivatedRoute, private authService: AuthenticationService) {
    this.Route.data.subscribe(res => {
      let data = res.dashRes;
      let role = this.authService.currentUserValue.role;

      if (data.success) {
        let stats = data.stats;
        this.dashboardItem1 = { ...this.dashboardItem1, value: stats.jobs };
        this.dashboardItem2 = {
          ...this.dashboardItem2,
          value: stats.applications
        };
        this.dashboardItem3 = { ...this.dashboardItem3, value: stats.filtered };
        this.dashboardItem4 = { ...this.dashboardItem4, value: stats.staff, 
          route: role ==="EMPLOYER" ? 'staff' : ''};
      }
    });
  }

  ngOnInit() {}
}
