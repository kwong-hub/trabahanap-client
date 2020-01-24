import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { AuthenticationService } from "@app/_services/authentication-service.service";
import {
  faHome,
  faAddressCard,
  faSignOutAlt,
  faBell,
  faLock
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "employer-header",
  templateUrl: "./employer-header.component.html",
  styleUrls: ["./employer-header.component.scss"]
})
export class EmployerHeaderComponent implements OnInit {
  faHome = faHome;
  faAddressCard = faAddressCard;
  faSignOutAlt = faSignOutAlt;
  faBell = faBell;
  faLock = faLock;

  @Output() signout = new EventEmitter();
  @Output() toggleBox = new EventEmitter();

  @Input() isChecked: boolean;
  drop: boolean = false;
  companyProfile: any;

  constructor(public authenticationService: AuthenticationService) {}

  ngOnInit() {
    // this.companyProfile = this.authenticationService.currentUserValue.company_profile;
    this.authenticationService.currentUser.subscribe(
      user => {
        if (user && user.company_profile) {
          this.companyProfile = user.company_profile;
        }
      },
      err => console.log(err)
    );
    window.onclick = () => {
      this.drop = false;
    };
  }

  logout() {
    this.signout.emit();
    return false; // prevents redirecting
  }

  hasChanged() {
    this.isChecked = !this.isChecked;
    this.toggleBox.emit(this.isChecked);
  }

  toggleDropdown(event) {
    event.stopPropagation();
    this.drop = !this.drop;
  }
}
