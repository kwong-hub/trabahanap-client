import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/_services/authentication-service.service';
import { Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Component({
  selector: 'app-adsadmin',
  templateUrl: './adsadmin.component.html',
  styleUrls: ['./adsadmin.component.scss']
})
export class AdsadminComponent implements OnInit {
  sideBarActive: boolean;
  slideActive: boolean;
  routing: boolean;

  constructor(public authenticationService: AuthenticationService, private router: Router) {
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
  }

  toggleSidebar($event) {
    this.sideBarActive = $event;
  }
}
