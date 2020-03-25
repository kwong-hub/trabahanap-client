import { Component, OnInit } from '@angular/core';
import { AdminService } from '@app/_services/admin.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-edit-plan-type',
  templateUrl: './edit-plan-type.component.html',
  styleUrls: ['./edit-plan-type.component.scss']
})
export class EditPlanTypeComponent implements OnInit {
  planTypeForm: FormGroup;
  defaultLimit = { max: '35', min: '0' };
  loading = false;
  submitted = false;
  planAdded = false;
  planType: any = {};
  value = 0;

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private Route: ActivatedRoute,
    private _location: Location
  ) {}

  ngOnInit() {
    this.planTypeForm = this.formBuilder.group({
      type: ['', Validators.required],
      name: ['', Validators.required],
      value: [0, Validators.required],
      amount: [0, Validators.required]
    });
    this.Route.data.subscribe(res => {
      let data = res.data;
      if (data.success && data.payment_plan_type) {
        this.planType = data.payment_plan_type;
        this.value = this.planType.type == 'PREMIUM' ? this.planType.valueInDays : this.planType.valueInPoints;
        this.planTypeForm.controls['value'].setValue(this.value);
        this.planTypeForm.controls['name'].setValue(this.planType.name);
        this.planTypeForm.controls['amount'].setValue(this.planType.amount);
        this.planTypeForm.controls['type'].setValue(this.planType.type);
      } else {
        // this._location.back();
      }
    });
  }

  radioChange(value) {
    this.planTypeForm.controls['type'].setValue(value);
  }

  onSubmit() {
    if (this.planTypeForm.valid) {
      this.loading = true;

      this.adminService.editPlanType({ ...this.planTypeForm.value, id: this.planType.id }).subscribe(
        data => {
          if (data.success) {
            this.loading = false;
            this.submitted = false;
            this.planTypeForm.reset();
            this.planAdded = true;

            setTimeout(() => {
              this.planAdded = false;
              this._location.back();
            }, 2000);
          }
        },
        error => {
          console.log(error);
        }
      );
    }
  }
}
