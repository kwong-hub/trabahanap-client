import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "applicant-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  dashboardItem1 = {
    value: 1234,
    description: "Available Jobs",
    percent: "50%",
    percentIncrease: false
  };
  dashboardItem2 = {
    value: 2938,
    description: "Available Companies",
    percent: "30%",
    percentIncrease: true
  };
  dashboardItem3 = {
    value: 930,
    description: "Jobs Applied",
    percent: "10%",
    percentIncrease: false
  };

  dashboardItem4 = {
    value: 1102,
    description: "Applications Viewed",
    percent: "10%",
    percentIncrease: true
  };

  constructor(private Route: ActivatedRoute) {
    this.Route.data.subscribe(res => {
      let data = res.dashRes;
      if (data.success) {
        let stats = data.stats;
        this.dashboardItem1 = { ...this.dashboardItem1, value: stats.jobs };
        this.dashboardItem3 = {
          ...this.dashboardItem3,
          value: stats.applications
        };
        this.dashboardItem2 = { ...this.dashboardItem2, value: stats.emp };
        this.dashboardItem4 = { ...this.dashboardItem4, value: stats.filtered };
      }
    });
  }

  ngOnInit() {}
}
