import { Component, OnInit } from "@angular/core";
import { OtherService } from "@app/_services/other.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import _ from "lodash";
import { AdminService } from "@app/_services/admin.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-add-staff",
  templateUrl: "./add-staff.component.html",
  styleUrls: ["./add-staff.component.scss"]
})
export class AddStaffComponent implements OnInit {
  addStaffer: FormGroup;
  submitted = false;
  stafferAdded = false;
  stafferError = false;
  previousStaffs = [];
  companyId;
  defaultLimit ={max:"30",min:"0"};
  numberRange={max:"16",min:"10"};
  bigLimit = {max:"100",min:"6"}
  constructor(
    private formBuilder: FormBuilder,
    private adminServices: AdminService,
    private Route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.companyId = this.Route.snapshot.params.id;
    this.addStaffer = this.formBuilder.group({
      email: ["", Validators.email],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      phoneNumber: ["", Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (!this.addStaffer.valid) {
      return;
    }

    const values = this.addStaffer.value;
    this.adminServices.addStaff(values, this.companyId).subscribe(
      success => {
        console.log(success);
        if (success.success) {
          this.stafferAdded = true;
          this.resetForm();
          setTimeout(() => {
            this.stafferAdded = false;
          }, 2000);
        } else {
          this.stafferError = true;
          setTimeout(() => {
            this.stafferError = false;
          }, 2000);
        }
      },
      error => console.log(error)
    );
  }

  resetForm() {
    this.submitted = false;
    _.map(this.addStaffer.controls, (value, key) => {
      this.addStaffer.controls[key].setValue("");
    });
  }
}
