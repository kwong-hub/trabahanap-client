import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { OtherService } from '@app/_services/other.service';
import { AdminService } from '@app/_services/admin.service';
import {
  faEllipsisV,

} from '@fortawesome/free-solid-svg-icons';
import { parse } from 'querystring';
@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss']
})
export class PaymentListComponent implements OnInit {
  subscription=[];
  displayedColumns: string[] = ['companyName','address', 'type', 'name', 'action'];
  pager: any;
  openActions: any={};
  faEllipsisV = faEllipsisV;
  footerCorr: boolean;
  constructor(private Route:ActivatedRoute,private _location:Location,private adminService:AdminService) {
    this.Route.data.subscribe(res => {
      console.log(res)
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

    this.subscription.map( subs =>{
      if( (parseInt(subs.purchased) - parseInt(subs.balance)) < 0){
        subs.balance = parseInt(subs.balance) - parseInt(subs.purchased)
      }else{
        subs.balance = 0;
      }
      
    })
  }

  toggleActions($evnet, id) {
    $evnet.stopPropagation();
    let value = this.openActions[id];
    this.openActions = {};
    this.openActions[id] = !value;
    this.footerCorr = !this.footerCorr;
  }
  getServerData(page) {
    this.adminService.getPaymentInfo(page.pageIndex+1,page.pageSize).subscribe(
      data=>{
        if (data.success) {
          this.subscription = data.subscriptions.subscriptions;
          this.pager = data.subscriptions.pager;
          this.subscription.map( subs =>{
            if( (parseInt(subs.purchased) - parseInt(subs.balance)) < 0){
              subs.balance = parseInt(subs.balance) - parseInt(subs.purchased)
            }else{
              subs.balance = 0;
            }
            
          })
        }
       
      }
    )
  }
}
