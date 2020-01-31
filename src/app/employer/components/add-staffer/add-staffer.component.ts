import { OtherService } from "@app/_services/other.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import _ from "lodash";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-add-staffer",
  templateUrl: "./add-staffer.component.html",
  styleUrls: ["./add-staffer.component.scss"]
})
export class AddStafferComponent implements OnInit {
  addStaffer: FormGroup;
  submitted = false;
  stafferAdded = false;
  stafferError = false;
  previousStaffs = [];
  defaultLimit ={max:"30",min:"0"};
  numberRange={max:"16",min:"10"};

  constructor(
    private formBuilder: FormBuilder,
    private otherService: OtherService,
    private Route: ActivatedRoute
  ) {
    this.Route.data.subscribe(res => {
      let data = res.data;
      if (data.success) {
        this.previousStaffs = data.staffs;
      }
    });
  }

  ngOnInit() {
    this.addStaffer = this.formBuilder.group({
      email: ["", Validators.email],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      phoneNumber: ["", Validators.required]
    });

    // this.otherService.getStaffs()
    //   .subscribe(
    //     success => {
    //       if(success.success && success.staffs){
    //         this.previousStaffs = success.staffs;
    //       }
    //     }
    //   )
  }

  onSubmit() {
    this.submitted = true;
    if (!this.addStaffer.valid) {
      return;
    }

    const values = this.addStaffer.value;
    this.otherService.addStaffer(values).subscribe(
      success => {
       // console.log(success);
        if (success.success) {
          this.stafferAdded = true;
          setTimeout(() => {
            this.stafferAdded = false;
            this.resetForm();
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
