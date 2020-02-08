import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent implements OnInit {
  subscription: any;
  hasSubscription: boolean;

  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe(res => {
      //console.log(res.data);
      if (res.data.success) {
        this.subscription = res.data.subscription;
        this.hasSubscription = true;
      } else {
        this.hasSubscription = false;
      }
    });
  }

  ngOnInit() {}
}
