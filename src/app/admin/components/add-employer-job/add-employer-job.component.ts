import { AdminService } from "@app/_services/admin.service";
import { OtherService } from "./../../../_services/other.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { faEyeDropper, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { JobService } from "@app/_services/jobs.service";
import { EmployerService } from "@app/_services/employer.service";
import { Location } from "@angular/common";

@Component({
  selector: "app-add-employer-job",
  templateUrl: "./add-employer-job.component.html",
  styleUrls: ["./add-employer-job.component.scss"]
})
export class AddEmployerJobComponent implements OnInit {
  companyId = null;
  userId = null;
  faCheck = faCheck;
  faEyeDropper = faEyeDropper;
  isEditMode = false;
  submitted = false;
  addJob: FormGroup;
  invalidFields: string[] = [];
  locations = [];
  industries = [];
  salaryRange = [
    { name: "<500", value: "<500" },
    { name: "500-100", value: "500-1000" },
    { name: "1000-5000", value: "1000-5000" },
    { name: "5000-10000", value: "5000-10000" },
    { name: ">10000", value: ">10000" }
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
    { name: "PART TIME", value: "PARTTIME" },
    { name: "FULL TIME", value: "FULLTIME" }
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
  previousJobs: any = [];
  jobAdded: boolean;
  jobEditted: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _location: Location,
    private otherService: OtherService,
    private employerService: EmployerService,
    private adminService: AdminService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(
      res => {
        if (res.id && res.userId) {
          this.companyId = res.id;
          this.userId = res.userId;
          this.employerService
            .getCompanyLocationsForAdmin(this.companyId)
            .subscribe(
              success => {
                if (success.success && success.locations) {
                  this.fillLocations(success.locations);
                }
              },
              error => console.log(error)
            );
        } else {
          this.router.navigateByUrl("/admin/employers");
        }
      },
      err => console.log(err)
    );

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

    this.otherService.getAllIndustries().subscribe(
      success => {
        if (success.success && success.industries) {
          this.fillIndustries(success.industries);
        }
      },
      error => console.log(error)
    );
  }

  onSubmit() {
    this.submitted = true;
    this.checkValidOnValueChange();
    if (this.addJob.invalid) {
      return;
    }

    var val = this.addJob.value;

    this.adminService.addEmployerJob({ ...val, userId: this.userId }).subscribe(
      success => {
        this.submitted = false;
        if (success.success) {
          this.jobAdded = true;
          setTimeout(() => {
            this.jobAdded = false;
            this._location.back();
          }, 3000);
        }
      },
      err => {
        this.submitted = false;
        console.log(err);
      }
    );
  }

  customValueChanged(value, name) {
    this.invalidFields = [];
    this.addJob.controls[name].setValue(value);
    this.checkValidOnValueChange();
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

  fillIndustries(industries) {
    industries.map(industry => {
      this.industries.push({
        name: industry.industryName,
        value: industry.industryName
      });
    });
  }

  fillLocations(locations) {
    locations.map(locations => {
      this.locations.push({
        name: locations.locationName,
        value: locations.id
      });
    });
  }
}
