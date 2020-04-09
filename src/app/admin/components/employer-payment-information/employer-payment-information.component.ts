import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import {
  faCheckCircle,
  faTimesCircle,faUser,faList,faMapMarker,faMoneyCheckAlt,faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { AdminService } from '@app/_services/admin.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-employer-payment-information',
  templateUrl: './employer-payment-information.component.html',
  styleUrls: ['./employer-payment-information.component.scss']
})
export class EmployerPaymentInformationComponent implements OnInit {
  subscription=[];
  faUser=faUser;
  faPhone=faPhone;
  faCheckCircle = faCheckCircle;
  faTimesCircle = faTimesCircle;
  faLocationArrow = faMapMarker;
  faMoneyCheck =faMoneyCheckAlt;
  faList =faList;
  totalBalance = 0;
  toPaidAmount = 0;
  isModalVisible = false;
  displayedColumns: string[] = ['type','transcactionDate','transactionTo', 'amount','name'];
  payForm:FormGroup;
  companyId: any;
  errors: string;
  isConfirmSuspend: boolean;
  deposited: boolean;
  totalTrans: number=0;
  company={};
  public pager: any;
  public page: any;
  constructor(private adminService:AdminService,private formBuilder:FormBuilder, private Route:ActivatedRoute,private _location:Location,private route:ActivatedRoute, private router:Router) {
    this.Route.data.subscribe(res => {
      let data = res.data;
      if(data.success && data.subscriptions) {
        this.subscription = data.subscriptions.subs;
        // console.log(data.subscriptions,'sd');
        this.pager = data.subscriptions.pager;
      }
      else {
        //this._location.back();
      }
    })
   }

  ngOnInit() {
    this.companyId = this.Route.snapshot.params.id;
    this.payForm = this.formBuilder.group({
      amount: ['', Validators.required],
      name: [''],
    });
    this.getCompanyInfo()
    this.adminService.getBalance(this.companyId).subscribe(data=>{
      if(data.success){
        // console.log(data)
        if(parseInt(data.balance[0].balance) > parseInt(data.balance[0].purchased)){
          this.totalBalance = parseInt(data.balance[0].balance) - parseInt(data.balance[0].purchased);
        }else{
          this.totalBalance = 0;
        }
        // this.toPaidAmount = parseInt(data.balance[0].purchased) - this.totalBalance ;
        if(parseInt(data.balance[0].purchased) >  parseInt(data.balance[0].balance)) {
          this.toPaidAmount = parseInt(data.balance[0].purchased) - parseInt(data.balance[0].balance) ;
        } else{
          this.toPaidAmount = 0;
        }
        if(data.balance[0].purchased){
          this.totalTrans = parseInt(data.balance[0].purchased)

          }
      }
    })
  }

  subscriptionDetail(id){
    this.router.navigate([`../../../payment/detail/${id}`],{relativeTo:this.route});
  }

  getCompanyInfo(){
    this.adminService.getCompanyInfo(this.companyId).subscribe(
      data =>{
        if(data.success){
            this.company = data.employers.company;
          }
      }
    )
  }

  depositMoney(){
    var val  = this.payForm.value;
    if(this.payForm.invalid){
      return;
    }
    if(parseInt(val.amount) < 0 || parseInt(val.amount) == NaN){
      this.payForm.controls['amount'].setErrors({ invalid: true })
        this.errors = "Invalid Amount must be greater than 0"
        return;
    }
    this.adminService.depositMoney(this.companyId,val.amount).subscribe(data => {
      if(data.success){    
        if(this.toPaidAmount >= 0 && this.toPaidAmount > val.amount){
          this.totalBalance  = this.totalBalance;
          this.toPaidAmount = this.toPaidAmount - val.amount;
        }else if(this.toPaidAmount <=  val.amount){
          this.toPaidAmount = 0;
          this.totalBalance = this.totalBalance + parseInt(val.amount)
        }
        else{
          this.toPaidAmount = this.toPaidAmount;
          this.totalBalance = (this.totalBalance + parseInt(val.amount)) - this.toPaidAmount ;
        }
       
        this.isModalVisible = false;
        this.deposited = true;
        // this.router.navigate([`../`],{relativeTo:this.route});
      }
    })
   
  }
  activateUser(id) {
    
  }
  cancelButton(){
    this.isModalVisible = false;
  }
  showModal() {
    this.isModalVisible = true;
  }

  toggleConfirm($event) {
    if(this.totalBalance < this.toPaidAmount){
      // this.insufficient = true;
    }else{
      this.isConfirmSuspend = !this.isConfirmSuspend;
    }
  }

  payExempt(){
    var val  = this.payForm.value;
    if(this.payForm.invalid){
      return;
    }
    if(parseInt(val.amount) != this.toPaidAmount){
      this.payForm.controls['amount'].setErrors({ invalid: true })
        this.errors = "Invalid Amount must be greater than too be paid"
        return;
    }
    this.adminService.payExtempt(this.companyId,val.name,val.amount).subscribe(
      data =>{
        console.log(data)
      }
    )
  }


  getServerData(page) {
    this.adminService.getEmployerPaymentInfo( this.companyId,page.pageIndex + 1, page.pageSize).subscribe(
      data => {
        if (data.success == true) {
          this.subscription = data.subscriptions.subs;
          
          this.pager = data.subscriptions.pager;
        }
      },
      err => console.log(err)
    );
  }


}
