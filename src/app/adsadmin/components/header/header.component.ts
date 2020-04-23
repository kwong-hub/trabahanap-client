import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { faHome, faAddressCard, faSignOutAlt, faBell, faLock } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from '@app/_services/authentication-service.service';

@Component({
  selector: 'admin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
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

  constructor(private authenticationService: AuthenticationService) {}

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
