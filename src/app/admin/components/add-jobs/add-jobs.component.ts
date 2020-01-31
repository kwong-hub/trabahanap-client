import { Component, OnInit } from "@angular/core";
import { LocationService } from "./../../../_services/location.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthenticationService } from "@app/_services/authentication-service.service";
import { Router, ActivatedRoute } from "@angular/router";
import { EmployerService } from "@app/_services/employer.service";
import { faCheck, faEyeDropper } from "@fortawesome/free-solid-svg-icons";
import { StateService } from "@app/_services/state.service";
import _ from "lodash";
import { JobService } from "@app/_services/jobs.service";
import { OtherService } from "@app/_services/other.service";
import { AdminService } from "@app/_services/admin.service";
import { Location } from "@angular/common";

@Component({
  selector: "app-add-jobs",
  templateUrl: "./add-jobs.component.html",
  styleUrls: ["./add-jobs.component.scss"]
})
export class AddJobsComponent implements OnInit {
  faCheck = faCheck;
  faEyeDropper = faEyeDropper;
  isEditMode = false;
  descriptionOnly = false;
  submitted = false;
  addJob: FormGroup;
  invalidFields: string[] = [];
  locations = [];
  industries = [];

  salaryRange = [
    { name: "Below 18,000", value: "<18000" },
    { name: "18,000-25,000", value: "18000-25000" },
    { name: "25,001-40,000", value: "25001-40000" },
    { name: "40,001-60,000", value: "40001-60000" },
    { name: "60,001-80,000", value: "60001-80000" },
    { name: ">80,000", value: ">80000" }
  ];
  educationAttainment = [
    { name: "High School Undergraduate", value: "High School Undergraduate" },
    { name: "High School Diploma", value: "High School Diploma" },
    { name: "Vocational School", value: "Vocational School" },
    { name: "College Undergraduate", value: "College Undergraduate" },
    { name: "College Graduate", value: "College Graduate" },
    { name: "Post Graduate Study", value: "Post Graduate Study" }
  ];

  // location = [
  //   {name: 'High School', value: 'Highschool'},
  //   {name: 'College', value: 'College'},
  //   {name: 'University', value: 'University'},
  //   {name: 'Degree', value: 'Deploma'}
  // ]
  employmentType = [
    { name: "Part Time", value: "PARTTIME" },
    { name: "Full Time", value: "FULLTIME" },
    { name: "Project Based", value: "PROJECTBASED" },
    { name: "Permanent", value: "PERMANENT" },
    { name: "Temporary", value: "TEMPORARY" },
    { name: "Internship/OJT", value: "INTERNSHIP/OJT" },
    { name: "Freelance", value: "FREELANCE" }
  ];
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
  job: any;
  companyId;
  previousJobs: any = [];
  jobAdded: boolean;
  jobEditted: boolean;
  defaultLimit ={max:"30",min:"0"};
  numberRange={max:"16",min:"10"};
  bigLimit = {max:"100",min:"6"}
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _location: Location,
    private adminService: AdminService,
    private otherService: OtherService,
    private jobService: JobService
  ) {
    this.route.params.subscribe(
      params => {
        if (params.jobId) {
          this.jobService.getJobById(params.jobId).subscribe(
            success => {
              this.job = success.job;
              this.job.applicationStartDate = this.job.applicationStartDate.split(
                "T"
              )[0];
              this.job.applicationEndDate = this.job.applicationEndDate.split(
                "T"
              )[0];
              // console.log(this.job.applicationStartDate);

              this.job.locationId = "";
              this.populateFields();
            },
            err => console.log(err)
          );
        }
      },
      err => console.log(err)
    );
  }

  ngOnInit() {
    this.companyId = this.route.snapshot.params.id;
    this.getIndustries();
    // this.getLocations();

    this.addJob = this.formBuilder.group({
      jobTitle: ["", Validators.required],
      jobDescription: ["", Validators.required],
      industry: ["", Validators.required],
      position: ["", Validators.required],
      educationAttainment: ["", Validators.required],
      salaryRange: ["", Validators.required],
      employmentType: ["", Validators.required],
      vacancies: ["", Validators.required],
      additionalQualifications: ["", Validators.required],
      applicationStartDate: ["", Validators.required],
      applicationEndDate: ["", Validators.required],
      locationId: ["", Validators.required]
    });

    //getLocations() {
  }

  getLocations() {
    this.adminService.getCompanyLocationsByCompanyId(this.companyId).subscribe(
      response => {
        const locations = response.locations.location;
        //console.log(response)
        if (locations) {
          locations.map(locations => {
            this.locations.push({
              name: locations.locationName,
              value: locations.id
            });
          });
          if (locations) {
            this.addJob.controls["locationId"].setValue(locations[0].id);
          }
        }
      },
      error => console.log(error)
    );
  }

  getIndustries() {
    this.otherService.getAllIndustries().subscribe(
      response => {
        const industries = response.industries;
        industries.map(industry => {
          this.industries.push({
            name: industry.industryName,
            value: industry.industryName
          });
        });

        this.addJob.controls["industry"].setValue(industries[0].id);
      },
      error => console.log(error)
    );
  }

  get form() {
    return this.addJob.controls;
  }

  onSubmit() {
    if (!this.descriptionOnly && this.job) {
      return;
    }
    this.submitted = true;
    this.checkValidOnValueChange();
    // console.log(this.addJob.invalid);
    if (this.addJob.invalid) {
      return;
    }

    var val = this.addJob.value;
    val["companyProfileId"] = this.companyId;

    if (this.job) {
      //console.log(this.job)
      this.job["jobDescription"] = val.jobDescription;
      this.adminService.editCompanyJob(this.job.id, this.job).subscribe(
        success => {
          //console.log(success)
          this.jobEditted = true;

          setTimeout(() => {
            this.jobEditted = false;
            this._location.back();
          }, 3000);
        },
        err => console.log(err)
      );
      return;
    }

    this.adminService.addCompanyJob({ ...val }, this.companyId).subscribe(
      success => {
        if (success.success) {
          this.jobAdded = true;
          setTimeout(() => {
            this.jobAdded = false;
            this.router.navigate([`/admin/employers/jobs/${this.companyId}`]);
          }, 3000);
        }
      },
      err => console.log(err)
    );
  }

  customValueChanged(value, name) {
    this.invalidFields = [];
    this.addJob.controls[name].setValue(value);
    this.checkValidOnValueChange();
  }

  showDetail($event) {
    this.router.navigate([`/employer/jobs/${$event.id}`]);
  }

  populateFields() {
    _.map(this.job, (value, key) => {
      this.addJob.controls[key]
        ? this.addJob.controls[key].setValue(value)
        : null;
    });

    this.disableEdit();
  }

  checkValidOnValueChange() {
    this.invalidFields = [];
    var specialInputs = [
      { value: "applicationEndDate", name: "Application End Date" },
      { value: "applicationStartDate", name: "Application Start Date" },
      { value: "educationAttainment", name: "Education Attainment" },
      { value: "employmentType", name: "Employment Type" },
      { value: "locationId", name: "Location" },
      { value: "salaryRange", name: "Salary Range" },
      { value: "industry", name: "Industry" }
    ];
    specialInputs.map(sp => {
      if (this.addJob.controls[sp.value].invalid) {
        this.invalidFields.push(sp.name);
      }
    });
  }

  enableEdit() {
    this.isEditMode = true;
    this.descriptionOnly = true;
    _.map(this.job, (value, key) => {
      if (this.addJob.controls[key]) {
        this.addJob.controls["jobDescription"].enable();
      }
    });
  }

  disableEdit() {
    this.isEditMode = false;
    _.map(this.job, (value, key) => {
      if (this.addJob.controls[key]) {
        this.addJob.controls[key].disable();
      }
    });
  }
}
