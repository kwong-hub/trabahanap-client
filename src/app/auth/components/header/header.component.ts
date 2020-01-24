import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "@app/_services/authentication-service.service";
import { Role } from "@app/_models/Role";
import {
  faSignOutAlt,
  faCaretDown,
  faHome
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "landing-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  @Input() menuActive;
  @Output() toggleNavigation = new EventEmitter();
  drop: boolean = false;
  slideActive: boolean;
  faSignOutAlt = faSignOutAlt;
  faCaretDown = faCaretDown;
  faHome = faHome;
  currentUser;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.authenticationService.currentUserSubject.subscribe(userValue => {
      this.currentUser = userValue;
    });
  }

  ngOnInit() {
    window.addEventListener("click", () => {
      this.drop = false;
    });
  }

  toggleMenu($event) {
    this.toggleNavigation.emit($event);
  }

  redirect($event) {
    this.toggleMenu($event);
    return false;
  }

  stopProp(e) {
    e.stopPropagation();
  }

  closeSlide() {
    this.slideActive = false;
  }

  toEmployers() {
    if (!this.currentUser) {
      this.router.navigate(["/login"], { queryParams: { as: "emp" } });
      // window.location.assign("/login?as=emp");
    } else if (this.currentUser.role === Role.employer) {
      this.router.navigate([`/${Role.employer.toLowerCase()}`]);
    } else if (this.currentUser.role === Role.applicant) {
      this.slideActive = true;
      return false;
    }
  }

  toggleDropdown(event) {
    event.stopPropagation();
    this.drop = !this.drop;
  }

  logout() {
    this.drop = !this.drop;
    this.authenticationService.logout();
    this.router.navigate(["/"]);
  }
}
