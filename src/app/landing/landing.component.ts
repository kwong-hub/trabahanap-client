import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { AuthenticationService } from '@app/_services/authentication-service.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  menuActive: boolean = false;
  currentUser = this.authenticationService.currentUserValue;
  routing: boolean;

  constructor(private authenticationService: AuthenticationService, private router: Router) {
    this.authenticationService.currentUserSubject.subscribe(
      data => {
        this.currentUser = data;
      }
    )
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

   
  redirect($event) {
    this.toggleNav($event);
    return false;
  }

  stopProp(e) {
    e.stopPropagation();
  }
  
  closeNav() {
    this.menuActive = false;
  }

  toggleNav($event) {
    this.menuActive = !this.menuActive;
    $event.stopPropagation();
  }

  logout() {
    this.authenticationService.logout();
    this.closeNav();
  }

}
