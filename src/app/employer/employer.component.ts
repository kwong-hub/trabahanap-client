import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/_services/authentication-service.service';
import { Router, Event, 
  NavigationStart, NavigationEnd, 
  NavigationCancel, NavigationError } from '@angular/router';

@Component({
  selector: 'app-employer',
  templateUrl: './employer.component.html',
  styleUrls: ['./employer.component.scss']
})
export class EmployerComponent implements OnInit {

  sideBarActive: boolean;
  slideActive: boolean;
  noLocations: boolean;
  routing: boolean;

  constructor(public authenticationService: AuthenticationService, private router: Router) {
    this.router.events.subscribe((event: Event) => {
      switch(true) {
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
    })
  }

  ngOnInit() {
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }

  toggleSidebar($event) {
    this.sideBarActive = $event;
    let currentUser = this.authenticationService.currentUserValue;
    
    // @ts-ignore
    if(!currentUser.companyProfileId) {
      this.slideActive = true;
      setTimeout(() =>{
        this.slideActive = false;
        this.noLocations = false;
      }, 3100);
      return false;
    }

    if(!currentUser.company_profile.hasLocations) {
      this.noLocations = true;
      setTimeout(() =>{
        this.slideActive = false;
        this.noLocations = false;
      }, 3100);
      return false;
    }

    setTimeout(() =>{
      this.slideActive = false;
      this.noLocations = false;
    }, 3100)
  }

  hello($event) {
    console.log("hello")
    // this.tog
  }
  
}
