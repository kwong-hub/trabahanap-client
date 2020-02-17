import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import {
  faCheckCircle,
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons';
import { AdminService } from '@app/_services/admin.service';
@Component({
  selector: 'app-employer-payment-information',
  templateUrl: './employer-payment-information.component.html',
  styleUrls: ['./employer-payment-information.component.scss']
})
export class EmployerPaymentInformationComponent implements OnInit {
  subscription=[];
  faCheckCircle = faCheckCircle;
  faTimesCircle = faTimesCircle;
  totalBalance = 0;
  toPaidAmount = 0;

  displayedColumns: string[] = ['companyName','transactionFrom', 'transactionTo', 'name','paid', 'action'];
  constructor(private adminService:AdminService, private Route:ActivatedRoute,private _location:Location,private route:ActivatedRoute, private router:Router) {
    this.Route.data.subscribe(res => {
      let data = res.data;
      //  console.log(data)
      if(data.success && data.subscriptions) {
        this.subscription = data.subscriptions;
        //console.log(this.subscription)
      }
      else {
        //this._location.back();
      }
    })
   }

  ngOnInit() {
    this.subscription.map( sub =>{
      if(sub.paid){
        this.totalBalance = this.totalBalance+sub.amount;
      }else{
        this.toPaidAmount = this.toPaidAmount + sub.amount;
      }
     
    });
  }

  subscriptionDetail(id){
    this.router.navigate([`../../../payment/detail/${id}`],{relativeTo:this.route});
  }

  confirmPayment(id){
    this.adminService.confirmPayment(id).subscribe(
      data => {
        // console.log(data)
        // this.applicants.forEach(applicant => {
        //   if (applicant.id === id) {
        //     applicant.active = !applicant.active;
        //     //this.openActions[comp.id] = null;
        //   }
        // });
      },
      error => {
        console.log(error);
      }
    );
  }

  activateUser(id) {
    
  }

}
