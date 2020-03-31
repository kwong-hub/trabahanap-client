import { Component, OnInit } from '@angular/core';
import { AdminService } from '@app/_services/admin.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-add-plan-type',
  templateUrl: './add-plan-type.component.html',
  styleUrls: ['./add-plan-type.component.scss']
})
export class AddPlanTypeComponent implements OnInit {
  planTypeForm: FormGroup;
  defaultLimit = { max: '35', min: '0' };
  loading = false;
  submitted = false;
  planAdded = false;

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private Route: ActivatedRoute,
    private _location: Location
  ) {}

  ngOnInit() {
    this.planTypeForm = this.formBuilder.group({
      type: ['PREMIUM', Validators.required],
      name: ['', Validators.required],
      value: ['', Validators.required],
      amount: ['', Validators.required]
    });
  }

  radioChange(value) {
    if (value == 'FREE') {
      this.planTypeForm.controls['amount'].setValue('0');
    }
    this.planTypeForm.controls['type'].setValue(value);
  }

  onSubmit() {
    if (this.planTypeForm.valid) {
      this.loading = true;
      let { type, name } = this.planTypeForm.value;
      name = name.toUpperCase();
      type = type.toUpperCase();

      this.adminService.addPlanType({ ...this.planTypeForm.value, name, type }).subscribe(
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
