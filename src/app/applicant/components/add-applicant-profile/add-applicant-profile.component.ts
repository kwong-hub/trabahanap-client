import { ApplicantService } from './../../../_services/applicant.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocationService } from '@app/_services/location.service';
import _ from 'lodash';
import { faCheck, faUserPlus, faIdCard, faCloudUploadAlt, faUserCheck, faEyeDropper, faEdit, faCamera, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/_services/authentication-service.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { formatDate } from '@angular/common';
 
export const PICK_FORMATS = {
  parse: {dateInput: {month: 'short', year: 'numeric', day: 'numeric'}},
  display: {
      dateInput: 'input',
      monthYearLabel: {year: 'numeric', month: 'short'},
      dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
      monthYearA11yLabel: {year: 'numeric', month: 'long'}
  }
};

export class PickDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
      if (displayFormat === 'input') {
          return formatDate(date,'dd MMMM, yyyy',this.locale);;
      } else {
          return date.toDateString();
      }
  }
}

@Component({
  selector: 'app-add-applicant-profile',
  templateUrl: './add-applicant-profile.component.html',
  styleUrls: ['./add-applicant-profile.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: PickDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS}
  ]
})
export class AddApplicantProfileComponent implements OnInit {
  @Input() applicantProfile: any;
  faCheck = faCheck;
  faUserPlus = faUserPlus;
  faIdCard = faIdCard;
  faCloudUploadAlt = faCloudUploadAlt;
  faUserCheck = faUserCheck;
  faEyeDropper = faEyeDropper;
  faEdit = faEdit;
  faCamera = faCamera;
  faTimes = faTimes;

  selectedImage;
  addApplicantProfileForm: FormGroup;
  formData = new FormData();
  regions: any;
  countries: any;
  cities: any;
  genderOptions: any = [
    { name: 'MALE', value: 'MALE' },
    { name: 'FEMALE', value: 'FEMALE' }
  ];
  monthOptions = [
    { name: 'January', value: '01' },
    { name: 'February', value: '02' },
    { name: 'March', value: '03' },
    { name: 'April', value: '04' },
    { name: 'May', value: '05' },
    { name: 'June', value: '06' },
    { name: 'July', value: '07' },
    { name: 'August', value: '08' },
    { name: 'September', value: '09' },
    { name: 'October', value: '10' },
    { name: 'November', value: '11' },
    { name: 'December', value: '12' }
  ];
  hasProfile: boolean = false;
  submitted: boolean = false;
  styleObject = {
    inputContainer: {},
    input: { fontSize: '1.7rem' },
    inputHeader: { fontSize: '1.7rem', borderBottom: '1px solid #888', backgroundColor: 'white' },
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
  styleObjectMonth = {
    inputContainer: { margin: '0' },
    input: { fontSize: '1.7rem' },
    inputHeader: { fontSize: '1.7rem', borderBottom: '1px solid #888', backgroundColor: 'white' },
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
  monthStyle = {
    inputContainer: { margin: '0' },
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
  dateStyle = {
    inputContainer: { marginRight: '0' },
    input: {},
    label: {},
    feedbackContainer: {},
    feedbackMessage: {}
  };

  cvFileTypes = '.pdf,.doc,.docx, .png, .jpg, jpeg';
  profilePictureFileTypes = '.png, .jpg, jpeg';
  inputType: string = 'file';
  showLoader = false;
  showCVPreview = false;

  isCVEditModalOpen = false;
  isApplicantPictureEditModalOpen = false;
  yearRange = { min: '1920', max: (new Date().getFullYear() - 18).toString() };
  dateRange = { min: '1', max: '31' };
  imageChangedEvent: any;
  croppedImage: any;
  tempImg: string;
  loading: boolean;
  success: boolean;
  defaultLimit = { max: '40', min: '0' };
  numberRange = { max: '20', min: '10' };
  bigLimit = { max: '70', min: '6' };
  fileTypeError: boolean;
  formError: boolean;
  isDocument: boolean;
  isImage: boolean;
  minDate: Date;
  maxDate: Date;
  startDate = new Date(1990, 0, 1);

  constructor(private formBuilder: FormBuilder, private locationService: LocationService, private applicantService: ApplicantService, private authService: AuthenticationService) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 100, 0, 1);
    this.maxDate = new Date(currentYear - 15, 11, 31);
  }

  ngOnInit() {
    this.getRegions();
    this.getCountries();

    this.addApplicantProfileForm = this.formBuilder.group({
      fullName: ['', this.applicantProfile ? Validators.required : ''],
      phoneNumber: ['', this.applicantProfile ? Validators.required : ''],
      firstName: [''],
      lastName: [''],
      currentEmployer: [''],
      currentOccopation: [''],
      address: [''],
      gender: ['', Validators.required],
      // year: ['', Validators.required],
      // month: ['', Validators.required],
      // date: ['', Validators.required],
      // matDate: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      selfDescription: ['', [Validators.required, Validators.maxLength(1500)]],
      cv: ['', Validators.required],
      applicantPicture: [''],
      CityId: ['', Validators.required],
      RegionId: ['', Validators.required],
      CountryId: ['', Validators.required]
    });

    if (this.applicantProfile) {
      this.hasProfile = true;
      this.inputType = 'text';
      this.updateForm();
      this.disableEdit();
      this.getCitiesByRegionId(this.applicantProfile.RegionId);
      this.getRegions();
    }
  }

  selectChanged(value, name) {
    if (name == 'RegionId') {
      this.getCitiesByRegionId(value);
      this.addApplicantProfileForm.controls['CityId'].setValue(null);
    }
    this.addApplicantProfileForm.controls[name].setValue(value);
  }

  updateForm() {
    if (this.applicantProfile.dateOfBirth) {
      // let temp_date = new Date(this.applicantProfile.dateOfBirth);
      this.applicantProfile = {
        ...this.applicantProfile,
        // year: temp_date.getFullYear(),
        // month: temp_date.getMonth() + 1,
        // date: temp_date.getDate(),
        fullName: `${this.applicantProfile.user.firstName} ${this.applicantProfile.user.lastName}`,
        phoneNumber: this.applicantProfile.user.phoneNumber
      };
    } else {
      this.applicantProfile = {
        ...this.applicantProfile,
        fullName: `${this.applicantProfile.user.firstName} ${this.applicantProfile.user.lastName}`,
        phoneNumber: this.applicantProfile.user.phoneNumber
      };
    }

    _.map(this.applicantProfile, (value, key) => {
      if (this.addApplicantProfileForm.controls[key] && key != 'cv' && key != 'applicantPicture') {
        this.addApplicantProfileForm.controls[key].setValue(value);
      }
    });
  }

  fileChanged(value, name) {
    this.fileTypeError = false;
    if (name === 'cv') {
      let size = value.size;
      let type = value.type;
      if (
        type !== 'application/doc' &&
        type !== 'application/ms-doc' &&
        type !== 'application/msword' &&
        type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' &&
        type !== 'application/pdf' &&
        type !== 'image/png' &&
        type !== 'image/jpg' &&
        type !== 'image/jpeg'
      ) {
        this.addApplicantProfileForm.controls['cv'].setValue('');
        this.fileTypeError = true;
        this.addApplicantProfileForm.controls['cv'].setErrors({ format: true });
        return;
      }

      if (size > 4000000) {
        this.addApplicantProfileForm.controls['cv'].setValue('');
        this.fileTypeError = true;
        this.addApplicantProfileForm.controls['cv'].setErrors({ maxSize: true });
        return;
      }
    }
    this.formData.append(name, value, value.name);
  }

  imageChanged(event: any) {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event;
  }

  closeImageModal() {
    this.imageChangedEvent = '';
    this.selectedImage = '';
  }

  saveImage() {
    this.tempImg = this.croppedImage.base64;
    this.closeImageModal();
    let byteCharacters = atob(this.tempImg.split(',')[1]);
    let byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    let byteArray = new Uint8Array(byteNumbers);
    let blob = new Blob([byteArray], { type: 'image/png' });

    this.formData.append('applicantPicture', blob);
  }

  get f() {
    return this.addApplicantProfileForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    let val = this.addApplicantProfileForm.value;
    // let date = `${val.year}-${val.month}-${val.date}`;
    // let now = new Date();

    // if (+val.year > now.getFullYear() - 15 || +val.year < 1920) {
    //   this.f.year.setErrors({ rangeOut: true });
    // }
    // if (+val.date > 31 || +val.date < 1) {
    //   this.f.date.setErrors({ rangeOut: true });
    // }

    // if (new Date(date).toDateString().includes('Invalid')) {
    //   this.addApplicantProfileForm.controls['month'].setErrors({
    //     invalid: true
    //   });
    //   return;
    // }

    // this.addApplicantProfileForm.controls['dateOfBirth'].setValue(date);
    if (this.addApplicantProfileForm.invalid) {
      return;
    }

    this.loading = true;
    this.success = false;
    this.formError = false;
    // new form value after date of birth is added
    val = this.addApplicantProfileForm.value;
    // this.showLoader = true;
    _.map(val, (value, key) => {
      if (key != 'cv' && key != 'applicantPicture') {
        this.formData.append(key, value);
      }
    });

    this.applicantService.addApplicantProfileWithCV(this.formData).subscribe(
      data => {
        this.loading = false;

        if (data.success) {
          this.success = true;
          this.submitted = false;
          let currentUser = this.authService.currentUserValue;
          this.authService.updateCurrentUser({
            ...currentUser,
            hasFinishedProfile: true,
            applicantProfile: data.applicantProfile
          });
          // this.router.navigate(["/applicant/jobs"]);
        } else {
          this.formError = true;
        }
      },
      err => {
        console.log(err);
        this.loading = false;
      }
    );
  }

  onEdit() {
    this.submitted = true;
    let val = this.addApplicantProfileForm.value;
    console.log(val);
    // return;
    // let date = `${val.year}-${val.month}-${val.date}`;
    // let now = new Date();

    // if (+val.year > now.getFullYear() - 15 || +val.year < 1920) {
    //   this.f.year.setErrors({ rangeOut: true });
    // }
    // if (+val.date > 31 || +val.date < 1) {
    //   this.f.date.setErrors({ rangeOut: true });
    // }

    // if (new Date(date).toDateString().includes('Invalid')) {
    //   this.addApplicantProfileForm.controls['month'].setErrors({
    //     invalid: true
    //   });
    //   return;
    // }
    let nameArray = val.fullName.split(' ');
    let lastName = nameArray.slice(1).join(' '); // in case value includes grandfather's name

    this.addApplicantProfileForm.controls['firstName'].setValue(nameArray[0]);
    this.addApplicantProfileForm.controls['lastName'].setValue(lastName);
    // this.addApplicantProfileForm.controls['dateOfBirth'].setValue(val.dateOfBirth);
    console.log(this.addApplicantProfileForm.controls['dateOfBirth'])
    if (this.applicantProfile.cv) {
      this.addApplicantProfileForm.controls['cv'].clearValidators();
      this.addApplicantProfileForm.controls['cv'].updateValueAndValidity();
    }

    if (this.addApplicantProfileForm.invalid) {
      return;
    }

    val = this.addApplicantProfileForm.value;

    // this.showLoader = true;
    this.success = false;
    this.loading = true;
    this.formError = false;
    _.map(val, (value, key) => {
      if (key != 'cv' && key != 'applicantPicture') {
        this.formData.append(key, value);
      }
    });

    //@ts-ignore
    // for (var pair of this.formData.entries()) {
    //   console.log(pair[0]+ ', '+ pair[1]);
    // }

    this.applicantService.editApplicantProfile(this.formData, this.applicantProfile.id).subscribe(
      data => {
        this.loading = false;
        // console.log(data)
        if (data.success) {
          this.success = true;
          this.applicantProfile = data.applicantProfile;
          this.updateForm();
          this.submitted = false;
          this.tempImg = '';
          let currentUser = this.authService.currentUserValue;
          this.authService.updateCurrentUser({
            ...currentUser,
            applicantProfile: data.applicantProfile
          });
          this.disableEdit();
          this.formData = new FormData();
        } else {
          this.formError = true;
        }
      },
      err => {
        this.loading = false;
        console.log(err);
      }
    );
  }

  getCitiesByRegionId(regionId) {
    this.locationService.getAllRegionCities(regionId).subscribe(
      response => {
        const cities = response.cities;
        this.cities = [];
        cities.map(city => {
          this.cities.push({ name: city.cityName, value: city.id });
        });
      },
      error => console.log(error)
    );
  }

  getRegions() {
    this.locationService.getAllRegions().subscribe(
      response => {
        const regions = response.regions;
        this.regions = [];
        regions.map(region => {
          if(region.countryId === 1) {
            this.regions.push({ name: region.regionName, value: region.id });
          }
        });
      },
      error => console.log(error)
    );
  }

  getCountries() {
    this.locationService.getAllCountries().subscribe(
      response => {
        const countries = response.countries;
        this.countries = [];
        // countries.map(country => {
        //   this.countries.push({ name: country.countryName, value: country.id });
        // });
        this.countries.push({ name: countries[0].countryName, value: countries[0].id });

          this.addApplicantProfileForm.controls['CountryId'].setValue(countries[0].id);
      },
      error => console.log(error)
    );
  }

  enableEdit(event) {
    event.stopPropagation();
    this.hasProfile = false;
    _.map(this.applicantProfile, (value, key) => {
      if (this.addApplicantProfileForm.controls[key]) {
        this.addApplicantProfileForm.controls[key].enable();
      }
    });
    // this.addApplicantProfileForm.controls['matDate'].enable();
    // this.addApplicantProfileForm.controls['date'].enable();
  }

  disableEdit() {
    this.hasProfile = true;
    _.map(this.applicantProfile, (value, key) => {
      if (this.addApplicantProfileForm.controls[key]) {
        this.addApplicantProfileForm.controls[key].disable();
      }
    });
    // this.addApplicantProfileForm.controls['dateOfBirth'].disable();
    // this.addApplicantProfileForm.controls['date'].disable();
  }

  onCVPreview(event) {
    this.success = false;
    event.stopPropagation();
    this.showCVPreview = !this.showCVPreview;
    if (this.showCVPreview) {
      let ext = this.applicantProfile.cv.split('.').pop();
      if (ext === 'pdf' || ext === 'doc' || ext === 'docx') {
        // console.log(ext);
        this.isDocument = true;
        this.isImage = false;
      } else {
        this.isImage = true;
        this.isDocument = false;
      }
    }
  }

  toggleCVModal() {
    this.isCVEditModalOpen = !this.isCVEditModalOpen;
    this.success = false;
  }

  toggleApplicantPictureModal() {
    this.isApplicantPictureEditModalOpen = !this.isApplicantPictureEditModalOpen;
  }

  editCVChanged(event) {
    console.log(event);
  }

  applicantUpdated(event) {
    this.toggleCVModal();
    this.applicantProfile = event;
    this.applicantProfile.dateOfBirth = this.applicantProfile.dateOfBirth
      ? this.applicantProfile.dateOfBirth.split('T')[0]
      : null;
    let currentUser = this.authService.currentUserValue;
    this.authService.updateCurrentUser({
      ...currentUser,
      hasFinishedProfile: true,
      applicantProfile: event
    });
    this.updateForm();
    this.success = true;
  }
}
