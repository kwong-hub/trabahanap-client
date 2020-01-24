import {
  Component,
  OnInit,
  HostListener,
  ElementRef,
  Input
} from "@angular/core";
import {
  faUsers,
  faUpload,
  faHandshake,
  faUserFriends
} from "@fortawesome/free-solid-svg-icons";

import {
  trigger,
  state,
  style,
  animate,
  transition
} from "@angular/animations";
import { Router } from "@angular/router";

@Component({
  selector: "app-dashboard-item",
  animations: [
    trigger("scrollAnimation", [
      state(
        "show",
        style({
          opacity: 1,
          transform: "translateX(0)"
        })
      ),
      state(
        "hide",
        style({
          opacity: 0,
          transform: `translateY(-50%)`
        })
      ),
      transition("hide => show", [animate("500ms ease-in")]),
      transition("show => hide", [animate("500ms ease-out")])
    ])
  ],
  templateUrl: "./dashboard-item.component.html",
  styleUrls: ["./dashboard-item.component.scss"]
})
export class DashboardItemComponent implements OnInit {
  state = "hide";
  faUsers = faUsers;
  faUpload = faUpload;
  faHandShake = faHandshake;
  faUserFriends = faUserFriends;
  @Input() iconName: string;
  @Input() dashboard: any;

  constructor(public el: ElementRef, private router: Router) {}

  ngOnInit() {
    setTimeout(() => {
      this.state = "show";
    }, 1);
  }

  // @HostListener('window:scroll', ['$event'])
  // checkScroll(){
  //   // const componentPosition = this.el.nativeElement.offsetTop
  //   // const scrollPosition = window.innerHeight + window.pageYOffset;
  //   // if(scrollPosition >= componentPosition){
  //   //   this.state = 'show';
  //   // }else{
  //   //   this.state = 'hide';
  //   // }
  // }

  navigate() {
    this.router.navigate([`/employer/${this.dashboard.route}`]);
  }

  getIcon() {
    return this.iconName == "faUsers"
      ? this.faUsers
      : this.iconName == "faUpload"
      ? this.faUpload
      : this.iconName == "faUserFriends"
      ? this.faUserFriends
      : this.faHandShake;
  }
}
