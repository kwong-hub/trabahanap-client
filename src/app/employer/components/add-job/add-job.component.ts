import { LocationService } from './../../../_services/location.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '@app/_services/authentication-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployerService } from '@app/_services/employer.service';
import { faCheck, faEyeDropper } from '@fortawesome/free-solid-svg-icons';
import { StateService } from '@app/_services/state.service';
import _ from 'lodash';
import { JobService } from '@app/_services/jobs.service';
import { OtherService } from '@app/_services/other.service';

@Component({
  selector: 'employer-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.scss']
})
export class AddJobComponent implements OnInit {

  faCheck = faCheck;
  faEyeDropper= faEyeDropper;
  isEditMode = false;
  submitted = false;
  addJob: FormGroup;
  invalidFields: string[] = [];
  locations = [];
  industries = [];
  salaryRange = [
    { name: 'Below 18,000', value: '<18000' },
    { name: '18,000-25,000', value: '18000-25000' },
    { name: '25,001-40,000', value: '25001-40000' },
    { name: '40,001-60,000', value: '40001-60000' },
    { name: '60,001-80,000', value: '60001-80000' },
    { name: '>80,000', value: '>80000' }
  ];
  educationAttainment = [
    {name: 'High School Undergraduate', value: 'High School Undergraduate'},
    {name: 'High School Diploma', value: 'High School Diploma'},
    {name: 'Vocational School', value: 'Vocational School'},
    {name: 'College Undergraduate', value: 'College Undergraduate'},
    {name: 'College Graduate', value: 'College Graduate'},
    {name: 'Post Graduate Study', value: 'Post Graduate Study'}
  ]

  // location = [
  //   {name: 'High School', value: 'Highschool'},
  //   {name: 'College', value: 'College'},
  //   {name: 'University', value: 'University'},
  //   {name: 'Degree', value: 'Deploma'}
  // ]
  employmentType = [
    {name: 'Part Time', value: 'PARTTIME'},
    {name: 'Full Time', value: 'FULLTIME'},
    {name: 'Project Based', value: 'PROJECTBASED'},
    {name: 'Permanent', value: 'PERMANENT'},
    {name: 'Temporary', value: 'TEMPORARY'},
    {name: 'Internship/OJT', value: 'INTERNSHIP/OJT'},
    {name: 'Freelance', value: 'FREELANCE'},
  ];
  styleObject = {'inputContainer': {}, 'inputHeader': {fontSize: "1.5rem", borderBottom: "1px solid #888"}, 'optionContainer': {backgroundColor: "#555", top: "3.3rem", boxShadow: '0px 1px 2px #aaa'}, 'option': {fontSize: "1.5rem", borderBottom: "1px solid #ddd", backgroundColor: '#fff'}};
  job: any;
  previousJobs: any = [];
  jobAdded: boolean;
  jobEditted: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute, 
    private employerService: EmployerService, 
    private router: Router,
    private jobService: JobService) {

      this.route.params.subscribe(
        params => {
          if(params.id){
            this.jobService.getJobById(params.id)
              .subscribe(
                success => {
                  this.job = success.job;
                  this.job.applicationStartDate = this.job.applicationStartDate.split('T')[0];
                  this.job.applicationEndDate = this.job.applicationEndDate.split('T')[0];
                  // console.log(this.job.applicationStartDate);
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

    this.route.data.subscribe(
      success => {
        if(success.data && success.data.locations && success.data.industries){
          const data = success.data;
          this.fillLocations(success.data.locations);
          this.fillIndustries(success.data.industries);
          // this.industries = data.industries;
          
        }
      },
      error => console.log(error)
    );

    this.jobService.getCompanyJobs(1, 5)
    .subscribe(
      success => {
        if(success.success == true){
          this.previousJobs = success.jobs.rows;
        }
      },
      err => console.log(err)
    )

    this.addJob = this.formBuilder.group({
      jobTitle: ['', Validators.required],
      jobDescription: ['', Validators.compose([Validators.required, Validators.maxLength(1500)])],
      industry: ['', Validators.required],
      pwd: [false],
      position: ['', ],
      educationAttainment: ['', Validators.required],
      salaryRange: ['', Validators.required],
      employmentType: ['', Validators.required],
      vacancies: ['', Validators.required],
      additionalQualifications: [''],
      applicationStartDate: ['', Validators.required],
      applicationEndDate: ['', Validators.required],
      locationId: ['', Validators.required],
    });
  }

  get form(){return this.addJob.controls}

  onSubmit(){
    if(!this.isEditMode && this.job){return;}
    this.submitted = true;
    this.checkValidOnValueChange();
    // console.log(this.addJob.invalid);
    if(this.addJob.invalid){return;}

    var val = this.addJob.value;

    if(this.job){
      this.employerService.editEmployerJob(this.job.id, val)
        .subscribe(
          success => {
            this.jobEditted = true;
            setTimeout(() => {
              this.jobEditted = false;
              this.router.navigate(['../'],{relativeTo: this.route});
            }, 3000);

          },
          err => console.log(err)
        )
      return;
    }

    this.employerService.addEmployerJob({...val})
      .subscribe(
        success => {
          if(success.success){
            this.jobAdded = true;
            setTimeout(() => {
              this.jobAdded = false;
              this.router.navigate(['../'],{relativeTo: this.route});
            }, 3000);
          }
        },
        err => console.log(err)
      );
  }


  customValueChanged(value, name){
    this.invalidFields = [];
    this.addJob.controls[name].setValue(value);
    this.checkValidOnValueChange();
  }

  showDetail($event){
    //this.router.navigate(['/jobs/${$event.id}' ,${$event.id}]);
    this.router.navigate([`../${$event.id}`],{relativeTo: this.route});
  }

  populateFields(){
    _.map(this.job, (value, key) => {
      this.addJob.controls[key] ? this.addJob.controls[key].setValue(value) : null;
    })

    this.disableEdit();
  }

  checkValidOnValueChange(){
    this.invalidFields = [];
    var specialInputs = [
      {value: 'applicationEndDate', name: 'Application End Date'}, 
      {value: 'applicationStartDate', name: 'Application Start Date'},
      {value: 'educationAttainment', name: 'Education Attainment'},
      {value: 'employmentType', name: 'Employment Type'},
      {value: 'locationId', name: 'Location'},
      {value: 'salaryRange', name: 'Salary Range'},
      {value: 'industry', name: 'Industry'}
    ];
    specialInputs.map(sp => {
      if(this.addJob.controls[sp.value].invalid){
        this.invalidFields.push(sp.name);
      }
    })
  }

  enableEdit(){
    this.isEditMode = true;
    _.map(this.job, (value, key) => {
      if(this.addJob.controls[key]){
        this.addJob.controls[key].enable(); 
      }
    })
  }

  disableEdit(){
    this.isEditMode = false;
    _.map(this.job, (value, key) => {
      if(this.addJob.controls[key]){
        this.addJob.controls[key].disable();
      }
    })
  }

  fillIndustries(industries){
    industries.map(industry => {
      this.industries.push({
        name: industry.industryName,
        value: industry.industryName
      })
    })
  }

  fillLocations(locations){
    locations.map(locations => {
      this.locations.push({
        name: locations.locationName,
        value: locations.id
      })
    })
  }
}
