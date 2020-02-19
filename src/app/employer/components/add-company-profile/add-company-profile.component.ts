import { LocationService } from './../../../_services/location.service';
import { AuthenticationService } from '@app/_services/authentication-service.service';
import { EmployerService } from './../../../_services/employer.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  faCheck,
  faUserPlus,
  faIdCard,
  faCloudUploadAlt,
  faUserCheck,
  faEyeDropper,
  faEdit,
  faCamera
} from '@fortawesome/free-solid-svg-icons';
import { Router, ActivatedRoute } from '@angular/router';

import _ from 'lodash';
import { VirtualTimeScheduler, Observable, Subject } from 'rxjs';
import { JobService } from '@app/_services/jobs.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { AnonymousService } from '@app/_services/anonymous.service';

@Component({
  selector: 'app-add-company-profile',
  templateUrl: './add-company-profile.component.html',
  styleUrls: ['./add-company-profile.component.scss']
})
export class AddCompanyProfileComponent implements OnInit {
  addCompanyProfileForm: FormGroup;
  submitted = false;

  faCamera = faCamera;
  faCheck = faCheck;
  faUserPlus = faUserPlus;
  faIdCard = faIdCard;
  faCloudUploadAlt = faCloudUploadAlt;
  faUserCheck = faUserCheck;
  faEyeDropper = faEyeDropper;
  faEdit = faEdit;

  cities = null;
  regions = null;
  countries = null;
  styleObject = {
    inputContainer: {},
    inputHeader: { fontSize: '1.5rem', borderBottom: '1px solid #888', backgroundColor: "white" },
    optionContainer: { backgroundColor: '#555', top: '3.3rem', boxShadow: '0px 1px 2px #aaa' },
    option: { fontSize: '1.5rem', borderBottom: '1px solid #ddd', backgroundColor: '#fff' }
  };
  submitStyle = { btn: { width: '100%' } };
  formErrors = ['Please fill in all the required inputs.'];
  serverErrors = false;
  hasProfile = false;
  companyProfile: any;
  inputType: string;
  logoFileTypes = '.png,.jpg,.jpeg';
  licenseFileTypes = '.pdf,.doc,.docx,.png,.jpg,.jpeg';
  formData = new FormData();
  showLicensePreview = false;

  isLogoEditModalOpen = false;
  isBusinessLicenseEditModalOpen = false;
  loading: boolean;
  INDUSTRIES$: Observable<any>;
  private industrySearchTerms = new Subject<string>();
  showIndustries: boolean;
  industries: any = [];
  success: boolean;
  tempImg;
  defaultLimit = { max: '35', min: '0' };
  numberRange = { max: '20', min: '10' };
  bigLimit = { max: '100', min: '6' };
  isDocument: boolean;
  isImage: boolean;
  imageModal: any;
  constructor(
    private formBuilder: FormBuilder,
    private employerService: EmployerService,
    private router: Router,
    private route:ActivatedRoute,
    private authService: AuthenticationService,
    private locationService: LocationService,
    private anonyService: AnonymousService
  ) {
    this.route.data.subscribe(res => {
      let data = res.data;
      if (data.success) {
        if(data.employer.company_profile){
         // this.inputType = data.employer.company_profile;
          this.companyProfile=data.employer.company_profile ;
        }
      } else {
        return false; 
      }
    });

  }

  ngOnInit() {
    // this.getCities();
    this.getRegions();
    this.getCountries();
    // this.getCities();

    this.inputType = this.companyProfile ? 'text' : 'file';

    this.addCompanyProfileForm = this.formBuilder.group({
      zipcode: ['', [Validators.min(10000), Validators.max(99999)]],
      companyName: ['', Validators.required],
      contactPerson: ['', Validators.required],
      contactNumber: ['', Validators.required],
      websiteURL: [''],
      industryType: ['', Validators.required],
      companyDescription: ['', Validators.required],
      businessLicense: ['', Validators.required],
      businessLicenseNumber: ['', Validators.required],
      companyLogo: ['', Validators.required],
      companyAddress: [''],
      cityId: ['', Validators.required],
      regionId: ['', Validators.required],
      countryId: ['', Validators.required]
    });
    this.updateInputes();
    if (this.companyProfile) {
      this.getCitiesByRegionId(this.companyProfile.regionId);
      this.addCompanyProfileForm.controls['cityId'].setValue(this.companyProfile.cityId);
    }

    this.INDUSTRIES$ = this.industrySearchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.anonyService.searchIndustries(term))
    );
    document.addEventListener('click', () => {
      this.showIndustries = false;
    });
  } // ngOnInit ends here

  get form() {
    return this.addCompanyProfileForm.controls;
  }

  updateInputes() {
    if (this.companyProfile) {
      this.hasProfile = true;
      // console.log(this.companyProfile)
      // this.companyProfile = this.companyProfile;
      _.map(this.companyProfile, (value, key) => {
        if (this.addCompanyProfileForm.controls[key]) {
          this.addCompanyProfileForm.controls[key].disable();
          this.addCompanyProfileForm.controls[key].setValue(value);
        }
      });
    }
  }

  fetchIndustries(term: string): void {
    if (term === '') {
      this.industries = [];
      return;
    }

    this.industrySearchTerms.next(term);
    this.INDUSTRIES$.subscribe(data => {
      this.industries = data.industries;

      this.showIndustries = true;
    });
  }

  selectIndustry(name) {
    this.addCompanyProfileForm.controls['industryType'].setValue(name);
    this.industries = [];
  }

  imageChanged(event) {
    this.formData = new FormData();
    let val = event.target.files[0] ? event.target.files[0] : null;
    let reader = new FileReader();
    reader.onload = (e: Event) => {
      this.tempImg = reader.result;
    };
    reader.readAsDataURL(val);
    this.formData.append('companyLogo', val, val.name);
  }

  selectChanged(value, name) {
    if (name == 'regionId') {
      this.getCitiesByRegionId(value);
      this.addCompanyProfileForm.controls['cityId'].setValue(null);
    }
    this.addCompanyProfileForm.controls[name].setValue(value);
  }

  fileChanged(value, name) {
    this.formData.append(name, value, value.name);
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
          this.regions.push({ name: region.regionName, value: region.id });
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
        countries.map(country => {
          this.countries.push({ name: country.countryName, value: country.id });
        });

        this.addCompanyProfileForm.controls['countryId'].setValue(countries[0].id);
      },
      error => console.log(error)
    );
  }

  getCities() {
    this.locationService.getAllCities().subscribe(
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

  enableEdit(event) {
    event.stopPropagation();
    this.hasProfile = false;
    _.map(this.companyProfile, (value, key) => {
      if (this.addCompanyProfileForm.controls[key]) {
        if (!['companyLogo', 'businessLicense'].includes(key)) {
          this.addCompanyProfileForm.controls[key].enable();
        }
      }
    });
  }

  disableEdit(event) {
    event.stopPropagation();
    this.hasProfile = true;
    _.map(this.companyProfile, (value, key) => {
      if (this.addCompanyProfileForm.controls[key]) {
        this.addCompanyProfileForm.controls[key].disable();
      }
    });
  }

  onLicensePreview() {
    this.showLicensePreview = !this.showLicensePreview;
    this.success = false; // to make the notification available for the next display
    if(this.showLicensePreview) {
      let ext = this.companyProfile.businessLicense.split('.').pop();
      if(ext === 'pdf' || ext === 'doc' || ext === 'docx') {
        this.isDocument = true;
        this.isImage = false;
      }
      else {
        this.isImage = true;
        this.isDocument = false;
      }
    }
  }

  updateProfile(data) {
    this.companyProfile = data;
    this.isBusinessLicenseEditModalOpen = false;
    this.success = true;
    this.updateInputes();
  }

  toggleLogoModal() {
    this.isLogoEditModalOpen = !this.isLogoEditModalOpen;
    this.companyProfile = this.companyProfile;
  }

  toggleBusinessLicense() {
    this.isBusinessLicenseEditModalOpen = !this.isBusinessLicenseEditModalOpen;
    this.success = false; // to make the notification available for the next display
  }

  editLogoChanged(event) {}

  get f() {
    return this.addCompanyProfileForm.controls;
  }
  
  onSubmit() {
    this.submitted = true;
    if (this.addCompanyProfileForm.invalid) {
      return;
    }
    this.success = false;
    this.loading = true;

    var val = this.addCompanyProfileForm.value;
    _.map(val, (value, key) => {
      if (key != 'companyLogo' && key != 'businessLicense') {
        this.formData.append(key, value);
      }
    });

    this.employerService.addCompanyProfileWithFile(this.formData).subscribe(
      response => {
        this.loading = false;
        if (response.success) {
          this.success = true;
          this.companyProfile=response.companyProfile.company_profile;
          this.authService.updateCurrentUser(response.companyProfile);
          // this.updateInputes();
        } else if (response.validationError && typeof response.validationError == 'object') {
          this.formErrors = this.formErrors.slice(1);
          _.map(response.validationError, (value, key) => {
            this.formErrors.push(value);
          });
          return (this.serverErrors = true);
        } else if (response.validationError) {
          this.formErrors[0] = response.validationError;
        }
      },
      error => {
        console.log(error);
        this.loading = false;
      }
    );
  }

  onEdit() {
    this.submitted = true;
    if (this.addCompanyProfileForm.invalid) {
      return;
    }

    this.success = false;
    this.loading = true;

    let val = this.addCompanyProfileForm.value;
    _.map(val, (value, key) => {
      if (key != 'companyLogo' && key != 'businessLicense') {
        this.formData.append(key, value);
      }
    });

    //@ts-ignore
    // for (var pair of this.formData.entries()) {
    // }

    this.employerService.editCompanyProfile(this.formData, this.companyProfile.id).subscribe(
      response => {
        this.loading = false;
        if (response.success) {
          this.success = true;
          this.companyProfile = response.companyProfile.company_profile;
          this.authService.updateCurrentUser(response.companyProfile);
          this.updateInputes();
          this.formData = new FormData();
          this.submitted = false;
        }

        else if (response.validationError && typeof response.validationError == 'object') {
          this.submitted = false;
          this.formErrors = this.formErrors.slice(1);
          _.map(response.validationError, (value, key) => {
            this.formErrors.push(value);
          });
          return (this.serverErrors = true);
        }
        else if (response.validationError) {
          this.formErrors[0] = response.validationError;
          this.submitted = false;
        }
        else if (response.message) {
          this.formErrors[0] = 'something is wrong try again letter.';
          this.submitted = false;
        }
        else { console.log(response) }
        this.loading = false;
      },
      error => {
        this.loading = false;
        console.log(error);
      }
    );
  }
}
