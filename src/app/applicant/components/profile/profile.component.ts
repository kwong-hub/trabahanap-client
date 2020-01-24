import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  profile: any;

  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe(res => {
      let data = res.data;
      if (data.success) {
        this.profile = data.applicantProfile;
      } else {
        return false;
      }
    });
  }

  ngOnInit() {}
}
