import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss']
})
export class PaymentListComponent implements OnInit {
  subscription=[];
  displayedColumns: string[] = ['companyName','transactionFrom', 'transactionTo', 'name', 'action'];
  constructor(private Route:ActivatedRoute,private _location:Location) {
    this.Route.data.subscribe(res => {
      let data = res.data;
       console.log(data)
      if(data.success && data.subscriptions) {
        this.subscription = data.subscriptions;
      }
      else {
        // this._location.back();
      }
    })
   }

  ngOnInit() {
  }

}
