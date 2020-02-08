import { AuthenticationService } from './../../../_services/authentication-service.service';
import { PaymentService } from './../../../_services/payment.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';

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

  constructor(
    private route: ActivatedRoute,
    private paymentService: PaymentService,
    private authenticationService: AuthenticationService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
    this.role = this.currentUser.role.toLowerCase();
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
      } else {
        // console.log('does not have subscripton');
        this.hasSubscription = false;
        this.upgradeActive = true;
      }
    });
  }

  ngOnInit() {}

  onUpgradeClick(event) {
    this.upgradeActive = true;
  }

  expressClicked(event) {
    if (this.subscription && this.subscription.type == 'PREMIUM') {
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
        this.purchaseSuccess = true;
        this.subscription = res.subscription;
        this.upgradeActive = false;
      }
    });
  }
}
