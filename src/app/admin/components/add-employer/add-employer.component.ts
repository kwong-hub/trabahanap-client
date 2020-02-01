import { AdminService } from '@app/_services/admin.service';
import { LocationService } from './../../../_services/location.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  faCheck,
  faUserPlus,
  faIdCard,
  faCloudUploadAlt,
  faUserCheck,
  faEyeDropper,
  faEdit,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import _ from 'lodash';

@Component({
  selector: 'app-add-employer',
  templateUrl: './add-employer.component.html',
  styleUrls: ['./add-employer.component.scss']
})
export class AddEmployerComponent implements OnInit {
  addEmployer: FormGroup;
  submitted = false;

  faCheck = faCheck;
  faUserPlus = faUserPlus;
  faIdCard = faIdCard;
  faCloudUploadAlt = faCloudUploadAlt;
  faUserCheck = faUserCheck;
  faTimes = faTimes;
  faEdit = faEdit;

  cities = null;
  regions = null;
  countries = null;
  industries = null;

  styleObject = {
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
  formErrors = ['Some form elements are not valid.'];
  serverErrors = false;
  hasProfile = false;
  companyProfile: any;
  inputType: string;
  logoFileTypes = '.png,.jpg,.jpeg';
  licenseFileTypes = '.pdf,.doc,.docx';
  formData = new FormData();
  profileAdded: boolean;
  showLicensePreview = false;
  employerAdded = false;
  employerAddFailed = false;

  isLogoEditModalOpen = false;
  isBusinessLicenseEditModalOpen = false;
  showLoader = false;
  profileEditted: boolean;
  defaultLimit = { max: '30', min: '0' };
  numberRange = { max: '16', min: '10' };
  bigLimit = { max: '100', min: '6' };
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private locationService: LocationService,
    private adminService: AdminService,
    private _location: Location
  ) {}

  ngOnInit() {
    this.route.data.subscribe(
      success => {
        if (success.data && success.data.regions && success.data.industries && success.data.countries) {
          const data = success.data;
          this.fillRegions(success.data.regions);
          this.fillCountries(success.data.countries);
          this.fillIndustries(success.data.industries);
          // this.industries = data.industries;
        }
      },
      error => console.log(error)
    );

    this.addEmployer = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.email],
      phoneNumber: ['', Validators.required],
      zipcode: ['', Validators.required],
      companyName: ['', Validators.required],
      contactPerson: ['', Validators.required],
      contactNumber: ['', Validators.required],
      websiteURL: ['', Validators.required],
      industryType: ['', Validators.required],
      companyDescription: ['', Validators.required],
      businessLicense: ['', Validators.required],
      businessLicenseNumber: ['', Validators.required],
      companyLogo: ['', Validators.required],
      companyAddress: ['', Validators.required],
      cityId: ['', Validators.required],
      regionId: ['', Validators.required],
      countryId: ['', Validators.required]
    });
  }

  selectChanged(value, name) {
    if (name == 'regionId') {
      this.getCitiesByRegionId(value);
      this.addEmployer.controls['cityId'].setValue(null);
    }
    this.addEmployer.controls[name].setValue(value);
  }

  fileChanged(value, name) {
    this.formData.append(name, value, value.name);
  }

  onSubmit() {
    this.submitted = true;
    if (this.addEmployer.invalid) {
      return;
    }

    this.showLoader = true;

    var val = this.addEmployer.value;
    _.map(val, (value, key) => {
      if (key != 'companyLogo' && key != 'businessLicense') {
        this.formData.append(key, value);
      }
    });

    this.adminService.addEmployer(this.formData).subscribe(
      success => {
        if (success.success) {
          this.employerAdded = true;
          setTimeout(() => {
            this.employerAdded = false;
            this._location.back();
          }, 3000);
          this.showLoader = this.submitted = false;
        } else {
          this.employerAddFailed = true;
          setTimeout(() => {
            this.employerAddFailed = false;
          }, 3000);
          this.showLoader = this.submitted = false;
        }
      },
      err => {
        this.showLoader = this.submitted = false;
        console.log(err);
      }
    );
  }

  cancle(event) {
    this.router.navigateByUrl('/admin/employers');
  }

  fillIndustries(industries) {
    this.industries = [];
    industries.map(industry => {
      this.industries.push({
        name: industry.industryName,
        value: industry.industryName
      });
    });
  }

  fillRegions(regions) {
    this.regions = [];
    regions.map(region => {
      this.regions.push({
        name: region.regionName,
        value: region.id
      });
    });
  }

  fillCountries(countries) {
    this.countries = [];
    countries.map(country => {
      this.countries.push({
        name: country.countryName,
        value: country.id
      });
    });
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
}
