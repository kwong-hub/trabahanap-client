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
  selector: "applicant-header",
  templateUrl: "./applicant-header.component.html",
  styleUrls: ["./applicant-header.component.scss"]
})
export class ApplicantHeaderComponent implements OnInit {
  faHome = faHome;
  faAddressCard = faAddressCard;
  faSignOutAlt = faSignOutAlt;
  faBell = faBell;
  faLock = faLock;

  @Output() signout = new EventEmitter();
  @Output() toggleBox = new EventEmitter();

  @Input() isChecked: boolean;
  drop: boolean = false;
  applicantProfile;

  constructor(public authenticationService: AuthenticationService) {
    this.authenticationService.currentUserSubject.subscribe(data => {
      if (data) {
        this.applicantProfile = data.applicantProfile;
      }
    });
  }

  ngOnInit() {
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
