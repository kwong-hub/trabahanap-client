import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "@app/_services/authentication-service.service";
import { Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from "@angular/router";

declare var gtag: Function;

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
      if(event instanceof NavigationEnd){
        let url: any = event.urlAfterRedirects.split('/');
        url = url.slice(0, 4).join('/');
        gtag('config', 'UA-116904531-1', {
          'page_path': url
        });
      }
    });
  }

  ngOnInit() {}

  logout() {
    this.authenticationService.logout();
    this.router.navigate(["/"]);
  }

  toggleSidebar($event) {
    this.slideActive = false;
    this.sideBarActive = $event;
    // @ts-ignore
    if (!this.authenticationService.currentUserValue.hasFinishedProfile) {
      this.slideActive = true;
    }
  }
}
