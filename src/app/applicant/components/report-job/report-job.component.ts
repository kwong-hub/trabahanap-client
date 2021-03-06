import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApplicantService } from '@app/_services/applicant.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-report-job',
  templateUrl: './report-job.component.html',
  styleUrls: ['./report-job.component.scss']
})
export class ReportJobComponent implements OnInit {
  reportForm: FormGroup;

  options = [
    { name: 'Discrimination', value: 'Discrimination' },
    { name: 'Offensive content', value: 'Offensive content' },
    { name: 'Up-front payment required', value: 'Up-front payment required' },
    { name: 'Scam/Fraud', value: 'Scam/Fraud' },
    { name: 'Others', value: 'Others' }
  ];

  styleObject = {
    inputContainer: {},
    input: { fontSize: '1.6rem' },
    label: { fontSize: '1.5rem' },
    inputHeader: { fontSize: '1.6rem', borderBottom: '1px solid #888' },
    optionContainer: {
      backgroundColor: '#555',
      top: '3.3rem',
      boxShadow: '0px 1px 2px #aaa'
    },
    option: {
      fontSize: '1.7rem',
      borderBottom: '1px solid #ddd',
      backgroundColor: '#fff'
    }
  };
  jobId: any;
  invalidFields: any[];
  jobReported: boolean;
  submitted: boolean;
  loading: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private applicantService: ApplicantService,
    private route: ActivatedRoute, private _location: Location
  ) {}

  ngOnInit() {
    this.reportForm = this.formBuilder.group({
      reportType: ['', Validators.required],
      comment: ['', Validators.required]
    });
  }

  customValueChanged(value, name) {
    this.invalidFields = [];
    this.reportForm.controls[name].setValue(value);
    //this.checkValidOnValueChange();
  }
  onCancel() {
    this._location.back();
  }
  onSubmit() {
    this.submitted = true;
    this.jobId = this.route.snapshot.params.id;
    if (this.reportForm.invalid) {
      return;
    }
    var val = this.reportForm.value;
    this.jobReported = false;
    this.loading = true;
    this.applicantService.reportJob({ ...val }, this.jobId).subscribe(
      success => {
        this.submitted = false;
        this.loading = false;
        if (success.success) {
          this.jobReported = true;
        }
      },
      err => console.log(err)
    );
  }
}
