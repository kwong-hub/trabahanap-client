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
  public pager: any;
  public page: any;
  displayedColumns: string[] = ['type', 'transcactionDate', 'transactionFrom', 'transactionTo', 'amount'];
  subscriptions: any;
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
      // console.log(res)
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
    // console.log(this.currentUser);
    this.paymentService.getEmployerPaymentInfo(this.currentUser.companyProfileId, 1, 5).subscribe(data => {
      // console.log(data);
      if(data.success){
        this.subscriptions = data.subscriptions.subs;
        this.pager = data.subscriptions.pager;
      }
     
    });
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

  getServerData(page) {
    this.paymentService
      .getEmployerPaymentInfo(this.currentUser.companyProfileId, page.pageIndex + 1, page.pageSize)
      .subscribe(
        data => {
          console.log(data);
          if (data.success == true) {
            this.subscriptions = data.subscriptions.subs;
            this.pager = data.subscriptions.pager;
          }
        },
        err => console.log(err)
      );
  }
}
