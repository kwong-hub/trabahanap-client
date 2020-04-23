import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '@app/_services/admin.service';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html',
  styleUrls: ['./payment-detail.component.scss']
})
export class PaymentDetailComponent implements OnInit {
  
  subscription;
  paymentForm=true;
  payForm:FormGroup;
  amountTobe;
  errors: string;
  defaultLimit = { max: '50', min: '0' };
  constructor(private route:ActivatedRoute,private formBuilder:FormBuilder, private adminService:AdminService,private _location:Location) { 
    this.route.data.subscribe(res => {
      let data = res.data;
      // console.log(res)
      if (data.success) {
        this.subscription = data.subscriptions;
        this.amountTobe = this.subscription.amount - this.subscription.paidAmount;
      } else {
      }
    });
  }

  ngOnInit() {
    this.payForm = this.formBuilder.group({
      amount: ['', Validators.nullValidator],
      name: ['', Validators.nullValidator],
    });

  }
  cancelButton(){
    this.paymentForm = true;
  }
  paySubscription(id){

    var val = this.payForm.value;
    if(this.subscription.amount < parseInt(this.payForm.value.amount)+ this.subscription.paidAmount){
      this.payForm.controls['amount'].setErrors({ invalid: true })
      this.errors = "Amount must be less than total transcation amount"
      return false;
    }
     this.adminService.confirmPayment(id,val.name,val.amount).subscribe(
      data => {
        // console.log(data)
        this.amountTobe = this.amountTobe - val.amount
        if(data.payment){
           this._location.back();
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  confirmPayment(){
    if(!this.subscription.paid){
      this.paymentForm = false
    }
  }

}
