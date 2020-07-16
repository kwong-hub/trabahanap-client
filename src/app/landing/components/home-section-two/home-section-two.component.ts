import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from '@app/_services/authentication-service.service';
import { Router } from '@angular/router';

@Component({
  selector: "landing-home-section-two",
  templateUrl: "./home-section-two.component.html",
  styleUrls: ["./home-section-two.component.scss"]
})
export class HomeSectionTwoComponent implements OnInit {
  adsModal: boolean;
  currentUser: any;
  showNotification: boolean;

  constructor(private authService: AuthenticationService, private router: Router) {
    this.authService.currentUser.subscribe(userValue => {
      this.currentUser = userValue;
    });
  }

  ngOnInit() {}

  toggleAds($event) {
    this.adsModal = !this.adsModal;
  }

  toRegister(query) {
    if(this.currentUser) {
      this.showNotification = true;
      setTimeout(() => {
        this.showNotification = false;
      }, 4500);
    } else {
      this.router.navigate(['/auth/register'], {queryParams: {as: query}})
    }
  }
}
