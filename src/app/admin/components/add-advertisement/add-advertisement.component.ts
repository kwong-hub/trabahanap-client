import { Component, OnInit } from "@angular/core";
import { AdminService } from "@app/_services/admin.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import _ from "lodash";
import { Time } from "@angular/common";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-add-advertisement",
  templateUrl: "./add-advertisement.component.html",
  styleUrls: ["./add-advertisement.component.scss"]
})
export class AddAdvertisementComponent implements OnInit {
  addAdsForm: FormGroup;
  styleObject = {
    inputContainer: {},
    inputHeader: { fontSize: "1.5rem", borderBottom: "1px solid #888" },
    optionContainer: {
      backgroundColor: "#555",
      top: "3.3rem",
      boxShadow: "0px 1px 2px #aaa"
    },
    option: {
      fontSize: "1.5rem",
      borderBottom: "1px solid #ddd",
      backgroundColor: "#fff"
    }
  };
  loading;
  submitted;
  formData = new FormData();
  AdsAdded: boolean;
  dates = {
    startDate: Date,
    endDate: Date
  };
  times = {
    adsStart: `00:00`,
    adsEnd: `23:59`
  };
  ads: any;

  constructor(
    private adminService: AdminService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {

    this.route.params.subscribe(
      params => {
        // if (params.adsId) {
        //   this.adminService.getAdsById(params.adsId).subscribe(
        //     success => {
        //       this.ads = success.ads;
        //       this.ads.applicationStartDate = this.ads.applicationStartDate.split(
        //         "T"
        //       )[0];
        //       this.ads.applicationEndDate = this.ads.applicationEndDate.split(
        //         "T"
        //       )[0];
        //       // console.log(this.ads.applicationStartDate);

        //       this.ads.locationId = "";
        //       this.populateFields();
        //     },
        //     err => console.log(err)
        //   );
        // }
      },
      err => console.log(err)
    );
  }

  ngOnInit() {
    this.addAdsForm = this.formBuilder.group({
      title: ["", Validators.required],
      adsEnd: ["", Validators.required],
      adsStart: ["", Validators.required],
      image: ["", Validators.required],
      websiteURL: ["", Validators.required]
    });

  }
  dateChanged(value, name) {
    this.dates[`${name}`] = value;
    this.addAdsForm.controls[`${name}`].setValue(value);
  }
  timeChanged(value, name) {
    this.times[`${name}`] = value;
    let values = this.addAdsForm.controls[`${name}`].value + value;
    this.addAdsForm.controls[`${name}`].setValue(values);
    // console.log(this.addAdsForm.controls[`${name}`].value)
  }
  fileChanged(value, name) {
    this.formData.append(name, value, value.name);
  }

  onSubmit() {
    this.submitted = true;

    if (this.addAdsForm.invalid) {
      return;
    }
    this.loading = true;
    let start =
      this.addAdsForm.controls["adsStart"].value + "T" + this.times.adsStart;
    let end =
      this.addAdsForm.controls["adsEnd"].value + "T" + this.times.adsEnd;
    this.addAdsForm.controls["adsStart"].setValue(start);
    this.addAdsForm.controls["adsEnd"].setValue(end);
    let val = this.addAdsForm.value;

    // console.log(val,'val')
    _.map(val, (value, key) => {
      if (key != "image") {
        this.formData.append(key, value);
      }
    });

    this.adminService.addAdvertisement(this.formData).subscribe(
      data => {
        this.loading = false;
        console.log(data);
        if (data.success) {
          this.AdsAdded = true;
          setTimeout(() => {
            this.AdsAdded = false;
            this.router.navigate([`../`], {
              relativeTo: this.route
            });
          }, 3500);
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}
