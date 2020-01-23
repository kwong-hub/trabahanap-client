import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ApplicantService } from "@app/_services/applicant.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-report-job",
  templateUrl: "./report-job.component.html",
  styleUrls: ["./report-job.component.scss"]
})
export class ReportJobComponent implements OnInit {
  reportForm: FormGroup;
  selectStyle = {
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
  options = [
    { name: "Discrimination", value: "Discrimination" },
    { name: "Offensive content", value: "Offensive content" },
    { name: "Up-front payment required", value: "Up-front payment required" },
    { name: "Scam/Fraud", value: "Scam/Fraud" },
    { name: "Others", value: "Others" }
  ];
  jobId: any;
  invalidFields: any[];
  jobAdded: boolean;
  submitted: boolean;
  loading: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private applicantService: ApplicantService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.reportForm = this.formBuilder.group({
      reportType: ["", Validators.required],
      comment: ["", Validators.required]
    });
  }

  customValueChanged(value, name) {
    this.invalidFields = [];
    this.reportForm.controls[name].setValue(value);
    //this.checkValidOnValueChange();
  }
  onCancel() {
    this.router.navigate(["../../"], { relativeTo: this.route });
  }
  onSubmit() {
    this.submitted = true;
    this.jobId = this.route.snapshot.params.id;
    if (this.reportForm.invalid) {
      return;
    }
    var val = this.reportForm.value;
    this.loading = true;
    this.applicantService.reportJob({ ...val }, this.jobId).subscribe(
      success => {
        this.submitted = false;
        this.loading = false;
        console.log(success);
        if (success.success) {
          this.jobAdded = true;
          setTimeout(() => {
            this.jobAdded = false;
            this.router.navigate(["../../"], { relativeTo: this.route });
          }, 3000);
        }
      },
      err => console.log(err)
    );
  }
}
