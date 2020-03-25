import { AuthenticationService } from './../../../_services/authentication-service.service';
import { PaymentService } from './../../../_services/payment.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ThrowStmt, IfStmt } from '@angular/compiler';
import { Location } from '@angular/common';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent implements OnInit {
  subscription: any;
  hasSubscription: boolean;
  upgradeActive = false;
  premiumActive = true;
  expressActive = false;
  purchaseSuccess = false;
  currentUser: any;
  role: any;
  msg;
  planTypes = [];
  premiumTypes = [];
  expressTypes = [];

  constructor(
    private route: ActivatedRoute,
    private paymentService: PaymentService,
    private authenticationService: AuthenticationService,
    private _location: Location
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
    this.role = this.currentUser.role.toLowerCase();
    this.route.data.subscribe(res => {
      this.planTypes = res.planTypes.payment_plan_types;
      if (this.planTypes) {
        this.premiumTypes = this.planTypes.filter(pt => pt.type == 'PREMIUM');
        this.expressTypes = this.planTypes.filter(pt => pt.type == 'EXPRESS');
      }
    });
    this.route.data.subscribe(res => {
      if (res.data.success) {
        this.subscription = res.data.subscription;
        this.subscription.expired =
          (this.subscription.type == 'PREMIUM' &&
            this.subscription.expirationDate <
              new Date()
                .toISOString()
                .split('.')[0]
                .replace('T', ' ')) ||
          (this.subscription.type == 'EXPRESS' && this.subscription.points <= 0);
        this.hasSubscription = true;
        this.msg = false;
      } else {
        this.msg = true;
        // console.log('does not have subscripton');
        this.hasSubscription = false;
        this.upgradeActive = true;
      }
    });

    this.msg = this.route.snapshot.paramMap.get('data');
  }

  ngOnInit() {
    //console.log(this._location.back(),'loc')
  }

  onUpgradeClick(event) {
    this.upgradeActive = true;
  }

  expressClicked(event) {
    if (this.subscription && this.subscription.type == 'PREMIUM' && !this.subscription.expired) {
      return;
    }
    this.expressActive = true;
    this.premiumActive = false;
  }

  premiumClicked(event) {
    this.premiumActive = true;
    this.expressActive = false;
  }

  purchasePlan(type, name) {
    this.purchaseSuccess = false;
    this.paymentService.puchasePlan({ type, name }).subscribe(res => {
      if (res.success) {
        this.msg = false;
        this.purchaseSuccess = true;
        this.subscription = res.subscription;
        this.upgradeActive = false;
      }
    });
  }

  // changeToStringDate(days){
  //   if(days/30 < 1) return `${days} days`;
  //   let remDays = days%30;
  //   let month = Math.floor(days/30);
  //   if(days/30 < 12) return `${month > 1 ? month + " months" : month + " month"} and ${days} days`;
  //   let year = Math.floor(days/365);

  // }
}
