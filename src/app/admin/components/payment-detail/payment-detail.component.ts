import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '@app/_services/admin.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html',
  styleUrls: ['./payment-detail.component.scss']
})
export class PaymentDetailComponent implements OnInit {
  subscription=[]
  constructor(private route:ActivatedRoute,private adminService:AdminService,private _location:Location) { 
    this.route.data.subscribe(res => {
      let data = res.data;
      // console.log(res)
      if (data.success) {
        this.subscription = data.subscriptions;
      } else {
      }
    });
  }

  ngOnInit() {
  }

  confirmPayment(id){
    this.adminService.confirmPayment(id).subscribe(
      data => {
        // console.log(data)
        if(data.payment){
          this._location.back();
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
