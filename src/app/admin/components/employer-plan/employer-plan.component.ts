import { PaymentService } from '@app/_services/payment.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '@app/_services/admin.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-employer-plan',
  templateUrl: './employer-plan.component.html',
  styleUrls: ['./employer-plan.component.scss']
})
export class EmployerPlanComponent implements OnInit {
  addSubscriptionForm: FormGroup;
  defaultLimit = { max: '35', min: '0' };
  loading = false;
  submitted = false;
  planAdded = false;
  planType: any = {};
  value = 0;
  preTypes = [];
  expTypes = [];
  freeTypes = [];
  options = [];
  companyProfileId;
  purchaseSuccess;

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private Route: ActivatedRoute,
    private paymentService: PaymentService,
    private _location: Location
  ) {}

  ngOnInit() {
    this.companyProfileId = this.Route.snapshot.paramMap.get('id');

    this.adminService.getPaymentPlanTypes().subscribe(
      data => {
        if (data.success) {
          this.categorizePlanTypes(data.payment_plan_types);
        }
      },
      err => console.log(err)
    );

    this.addSubscriptionForm = this.formBuilder.group({
      type: ['FREE', Validators.required],
      name: ['', Validators.required]
    });
  }

  categorizePlanTypes(plan_types) {
    plan_types.map(pt => {
      if (pt.type == 'EXPRESS') {
        this.expTypes.push({ name: pt.name, value: pt.name, price: pt.amount });
      } else if (pt.type == 'PREMIUM') {
        this.preTypes.push({ name: pt.name, value: pt.name, price: pt.amount });
      } else if (pt.type == 'FREE') {
        this.freeTypes.push({ name: pt.name, value: pt.name, price: pt.amount });
      }
    });

    this.options = this.freeTypes;
    this.addSubscriptionForm.controls['name'].setValue(this.freeTypes[0].name);
  }

  radioChange(value) {
    this.addSubscriptionForm.controls['type'].setValue(value);
    if (value == 'PREMIUM') {
      this.options = this.preTypes;
    } else if (value == 'EXPRESS') {
      this.options = this.expTypes;
    } else {
      this.options = this.freeTypes;
    }
  }

  onSubmit() {
    if (this.addSubscriptionForm.valid) {
      this.paymentService
        .adminPuchasePlan({ ...this.addSubscriptionForm.value, companyProfileId: this.companyProfileId })
        .subscribe(res => {
          if (res.success) {
            this.purchaseSuccess = true;
          }
        });
    }
  }

  selectChanged(value) {
    this.addSubscriptionForm.controls['name'].setValue(value);
  }
}
