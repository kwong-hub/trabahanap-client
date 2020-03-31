import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { OtherService } from '@app/_services/other.service';
import { AdminService } from '@app/_services/admin.service';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss']
})
export class PaymentListComponent implements OnInit {
  subscription=[];
  displayedColumns: string[] = ['companyName','transactionFrom', 'transactionTo', 'name', 'action'];
  pager: any;
  constructor(private Route:ActivatedRoute,private _location:Location,private adminService:AdminService) {
    this.Route.data.subscribe(res => {
      let data = res.data;
      if(data.success && data.subscriptions) {
        this.subscription = data.subscriptions.subscriptions;
         this.pager = data.subscriptions.pager
      }
      else {
        // this._location.back();
      }
    })
   }

  ngOnInit() {
  }

  getServerData(page) {
    this.adminService.getPaymentInfo(page.pageIndex+1,page.pageSize).subscribe(
      data=>{
        if (data.success) {
          this.subscription = data.subscriptions.subscriptions;
          this.pager = data.subscriptions.pager;
        }
      }
    )
  }
}
