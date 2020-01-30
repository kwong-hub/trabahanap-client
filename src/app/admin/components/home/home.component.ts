import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AdminService } from "@app/_services/admin.service";

@Component({
  selector: "admin-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  dashboardItem1 = {
    value: "",
    description: "Employers",
    percent: "50%",
    route: "employers"
  };
  dashboardItem2 = {
    value: "",
    description: "Applicants",
    percent: "30%",
    route: "applicants"
  };
  dashboardItem3 = {
    value: "",
    description: "Active Jobs",
    percent: "10%",
    route: "jobs"
  };
  dashboardItem4 = {
    value: "",
    description: "Applications",
    percent: "10%",
    route: "applications"
  };

  constructor(private Route: ActivatedRoute) {
    this.Route.data.subscribe(res => {
      let data = res.dashRes;
      console.log(data)
      if (data.success) {
        let stats = data.stats;
        this.dashboardItem1 = {
          ...this.dashboardItem1,
          value: stats.employers
        };
        this.dashboardItem2 = {
          ...this.dashboardItem2,
          value: stats.applicants
        };
        this.dashboardItem3 = { ...this.dashboardItem3, value: stats.jobs };
        this.dashboardItem4 = {
          ...this.dashboardItem4,
          value: stats.applications
        };
      }
    });
  }

  ngOnInit() {}
}
