import { Component, OnInit, HostBinding, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { EmployerService } from '@app/_services/employer.service';
import _ from 'lodash';
import { Location } from '@angular/common';
import { ApplicantService } from '@app/_services/applicant.service';
import { AuthenticationService } from '@app/_services/authentication-service.service';

@Component({
  selector: 'app-issue-form',
  templateUrl: './issue-form.component.html',
  styleUrls: ['./issue-form.component.scss']
})
export class IssueFormComponent implements OnInit {
  @HostBinding('attr.class') cssClass = 'form';
  @Output() issueAdded = new EventEmitter();
  issueForm: any;
  submitted: boolean;
  loading: boolean;
  formData = new FormData();
  issueSuccess: boolean;
  selectStyle = {
    inputContainer: {},
    inputHeader: { fontSize: '1.5rem', borderBottom: '1px solid #888' },
    optionContainer: {
      backgroundColor: '#555',
      top: '3.3rem',
      boxShadow: '0px 1px 2px #aaa'
    },
    option: {
      fontSize: '1.5rem',
      borderBottom: '1px solid #ddd',
      backgroundColor: '#fff'
    }
  };
  options = [
    { name: 'Job Post Issue', value: 'Job Post Issue' },
    { name: 'Marketing', value: 'Marketing' },
    { name: 'Partnership', value: 'Partnership' },
    { name: 'Payment Issue', value: 'Payment Issue' },
    { name: 'Report an Error', value: 'Report an Error' },
    { name: 'Sales and Ads', value: 'Sales and Ads' },
    { name: 'Technical Issue', value: 'Technical Issue' },
    { name: 'Website Issue', value: 'Website Issue' },
    { name: 'Others', value: 'Others' }
  ];
  role: string;
  defaultLimit = { max: '50', min: '0' };
  constructor(
    private formBuilder: FormBuilder,
    public employerService: EmployerService,
    private _location: Location,
    private applicantService: ApplicantService,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.issueForm = this.formBuilder.group({
      issueReason: ['', Validators.required],
      issueType: ['', Validators.required],
      picture: [''],
      issueDescription: ['', Validators.required]
    });
    this.role = this.authService.currentUserValue.role.toLowerCase();
  }

  selectChanged(value, name) {
    this.issueForm.controls[name].setValue(value);
  }

  goBack() {
    this._location.back();
  }

  fileChanged(value, name) {
    this.formData.append(name, value, value.name);
  }

  onSubmit() {
    this.submitted = true;
    if (this.issueForm.invalid) {
      return;
    }

    this.loading = true;

    let val = this.issueForm.value;
    _.map(val, (value, key) => {
      if (key != 'picture') {
        this.formData.append(key, value);
      }
    });

    //@ts-ignore
    for (var pair of this.formData.entries()) {
      // console.log(pair[0], pair[1])
    }

    if (this.role === 'employer') {
      this.employerService.sendIssue(this.formData).subscribe(
        data => {
          // console.log(data);
          if (data.success) {
            this.issueForm.reset();
            this.issueSuccess = true;
            this.submitted = false;
            this.loading = false;
            this.issueAdded.emit(data.issue);
            setTimeout(() => {
              this.issueSuccess = false;
            }, 4000);
          } else {
            this.loading = false;
          }
        },
        error => {
          console.log(error);
          this.loading = false;
        }
      );
    } else if (this.role === 'applicant') {
      this.applicantService.sendIssue(this.formData).subscribe(
        data => {
          // console.log(data);
          if (data.success) {
            this.issueForm.reset();
            this.issueSuccess = true;
            this.submitted = false;
            this.loading = false;
            this.issueAdded.emit(data.issue);
            setTimeout(() => {
              this.issueSuccess = false;
            }, 4000);
          } else {
            this.loading = false;
          }
        },
        error => {
          console.log(error);
          this.loading = false;
        }
      );
    }
  }
}
