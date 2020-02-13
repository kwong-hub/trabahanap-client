import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/_services/authentication-service.service';
import { Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

declare var gtag: Function;

@Component({
  selector: 'app-employer',
  templateUrl: './employer.component.html',
  styleUrls: ['./employer.component.scss']
})
export class EmployerComponent implements OnInit {
  sideBarActive: boolean;
  noProfile: boolean;
  noLocations: boolean;
  routing: boolean;

  constructor(public authenticationService: AuthenticationService, private router: Router) {
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.routing = true;
          break;
        }
        case event instanceof NavigationEnd: {
          window.scrollTo(0, 0);
          // break;
        }
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
        url = url.slice(0, 3).join('/');
        gtag('config', 'UA-116904531-1', {
          'page_path': url
        });
      }
    });
  }

  ngOnInit() {}

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }

  toggleSidebar($event) {
    this.noProfile = false;
    this.noLocations = false;
    this.sideBarActive = $event;
    let currentUser = this.authenticationService.currentUserValue;

    // @ts-ignore
    if(!currentUser.companyProfileId) {
      this.noProfile = true;
      return false;
    }

    if(!currentUser.company_profile.hasLocations) {
      this.noLocations = true;
    }
  }
}
