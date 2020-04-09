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
  styleUrls: ['./employer-plan.component.scss'],
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

  styleObject = {
    inputContainer: {},
    inputHeader: { fontSize: '1.5rem', borderBottom: '1px solid #888', backgroundColor: 'white' },
    optionContainer: { backgroundColor: '#555', top: '3.3rem', boxShadow: '0px 1px 2px #aaa' },
    option: { fontSize: '1.5rem', borderBottom: '1px solid #ddd', backgroundColor: '#fff' },
  };

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private Route: ActivatedRoute,
    private paymentService: PaymentService,
    private _location: Location
  ) {}

  ngOnInit() {
    this.companyProfileId = this.Route.snapshot.paramMap.get('id');

    this.adminService.getPaymentPlanTypes(1, 6).subscribe(
      (data) => {
        if (data.success) {
          this.categorizePlanTypes(data.payment_plan_types);
        }
      },
      (err) => console.log(err)
    );

    this.addSubscriptionForm = this.formBuilder.group({
      type: ['EXPRESS', Validators.required],
      name: ['', Validators.required],
    });
  }

  categorizePlanTypes(plan_types) {
    plan_types.map((pt) => {
      if (pt.type == 'EXPRESS') {
        this.expTypes.push({ name: pt.name, value: pt.name, price: pt.amount });
      } else if (pt.type == 'PREMIUM') {
        this.preTypes.push({ name: pt.name, value: pt.name, price: pt.amount });
      }
    });

    this.options = this.expTypes;
    this.addSubscriptionForm.controls['name'].setValue(this.expTypes[0].name);
  }

  radioChange(value) {
    this.addSubscriptionForm.controls['type'].setValue(value);
    if (value == 'PREMIUM') {
      this.options = this.preTypes;
      this.addSubscriptionForm.controls['name'].setValue(this.preTypes[0].name);
    } else if (value == 'EXPRESS') {
      this.options = this.expTypes;
      this.addSubscriptionForm.controls['name'].setValue(this.expTypes[0].name);
    }
  }

  onSubmit() {
    if (this.addSubscriptionForm.valid) {
      this.paymentService
        .adminPuchasePlan({ ...this.addSubscriptionForm.value, companyProfileId: this.companyProfileId })
        .subscribe((res) => {
          if (res.success) {
            this.purchaseSuccess = true;
            setTimeout(() => {
              this._location.back();
            }, 3000);
          }
        });
    }
  }
  goBack(){
    this._location.back();
  }
  selectChanged(value) {
    this.addSubscriptionForm.controls['name'].setValue(value);
  }
}
