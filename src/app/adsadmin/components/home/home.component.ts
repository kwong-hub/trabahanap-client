import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '@app/_services/admin.service';
import { stringify } from 'querystring';

@Component({
  selector: 'admin-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dashboardItem1 = {
    value: "",
    description: "Active Ads",
    percent: "50%",
    route: "ads"
  };
  dashboardItem2 = {
    value: 0,
    description: "InActive Ads",
    percent: "30%",
    route: "ads"
  };
  stats;
  constructor(private Route: ActivatedRoute, private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.getAdsCounter().subscribe(
      data => {
        if (data.success) {
          this.stats=data.stats
          this.dashboardItem1 = { ...this.dashboardItem1, value: data.stats.adsActives };
          this.dashboardItem2 = {
            ...this.dashboardItem2,
            value:  data.stats.ads - data.stats.adsActives
          };
          this.stats.InActive = data.stats.ads - data.stats.adsActives;
        }
      }
    )
  }
}
