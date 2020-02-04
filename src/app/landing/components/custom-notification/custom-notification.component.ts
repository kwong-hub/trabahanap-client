import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { faExclamation } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'landing-custom-notification',
  templateUrl: './custom-notification.component.html',
  styleUrls: ['./custom-notification.component.scss']
})
export class CustomNotificationComponent implements OnInit {

  @Input() text: string;
  @Input() show: boolean;
  @Input() type: string;
  @Input() callback;
  @Input() styleObject: { notification: {}; body: {}; icon: {}; text: {}; };
  faExclamation = faExclamation;
  
  constructor(private _location: Location, private router: Router) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if(changes.show && changes.show.currentValue) {
      setTimeout(() => {
        // this.show = false;
        if(!this.callback) {
          return;
        }
        else if(this.callback === "goBack") {
          this._location.back();
        }
        else {
          this.router.navigate([this.callback]);
        }
      }, 4550);
    }
  }

}
