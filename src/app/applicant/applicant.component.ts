import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "@app/_services/authentication-service.service";
import {
  Router,
  Event,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from "@angular/router";

@Component({
  selector: "app-applicant",
  templateUrl: "./applicant.component.html",
  styleUrls: ["./applicant.component.scss"]
})
export class ApplicantComponent implements OnInit {
  sideBarActive: boolean;
  isChecked: boolean;
  slideActive: boolean;
  routing: boolean;
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.routing = true;
          window.scrollTo(0, 0);
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.routing = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  ngOnInit() {}

  logout() {
    this.authenticationService.logout();
    this.router.navigate(["/"]);
  }

  toggleSidebar($event) {
    this.sideBarActive = $event;
    // @ts-ignore
    if (!this.authenticationService.currentUserValue.hasFinishedProfile) {
      this.slideActive = true;
    }

    setTimeout(() => {
      this.slideActive = false;
    }, 3100);
  }
}
