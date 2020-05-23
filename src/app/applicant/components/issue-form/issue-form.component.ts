import { Component, OnInit, HostBinding, Output, EventEmitter, ViewChild } from '@angular/core';
import { CustomSelectComponent } from '@app/shared/components/custom-select/custom-select.component';
import { FormBuilder, Validators } from '@angular/forms';
import { ApplicantService } from '@app/_services/applicant.service';
import { Location } from '@angular/common';
import _ from 'lodash';

@Component({
  selector: 'app-issue-form',
  templateUrl: './issue-form.component.html',
  styleUrls: ['./issue-form.component.scss']
})
export class IssueFormComponent implements OnInit {

  @ViewChild('issueTypeSelect', {static: false}) typeSelectRef: CustomSelectComponent;
  @HostBinding('attr.class') cssClass = 'form';
  @Output() issueAdded = new EventEmitter();
  @Output() issueFailed = new EventEmitter();
  issueForm: any;
  submitted: boolean;
  loading: boolean;
  formData = new FormData();
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
    { name: 'Credit Issue', value: 'Credit Issue' },
    { name: 'Job Post Issue', value: 'Job Post Issue' },
    { name: 'Marketing', value: 'Marketing' },
    { name: 'Partnership', value: 'Partnership' },
    { name: 'Employer Abuse', value: 'Employer Abuse' },
    { name: 'Payment Issue', value: 'Payment Issue' },
    { name: 'Report an Error', value: 'Report an Error' },
    { name: 'Sales and Ads', value: 'Sales and Ads' },
    { name: 'Technical Issue', value: 'Technical Issue' },
    { name: 'Website Issue', value: 'Website Issue' },
    { name: 'Others', value: 'Others' }
  ];
  defaultLimit = { max: '35', min: '0' };
  constructor(
    private formBuilder: FormBuilder,
    public applicantService: ApplicantService,
    private _location: Location
  ) {}

  ngOnInit() {
    this.issueForm = this.formBuilder.group({
      issueReason: ['', Validators.required],
      issueType: ['', Validators.required],
      picture: [''],
      issueDescription: ['', Validators.required]
    });
  }

  selectChanged(value, name) {
    this.issueForm.controls[name].setValue(value);
  }

  goBack() {
    this._location.back();
  }

  fileChanged(value, name) {
    this.formData = new FormData();
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

    this.applicantService.sendIssue(this.formData).subscribe(
      data => {
        this.submitted = false;
        this.loading = false;

        if (data.success) {
          this.issueForm.reset();
          this.formData = new FormData();
          this.typeSelectRef.resetValue();
          this.issueAdded.emit(data.issue);
        } else {
          this.issueFailed.emit();
        }
      },
      error => {
        this.loading = false;
        this.issueFailed.emit();
      }
    );
  }
}
