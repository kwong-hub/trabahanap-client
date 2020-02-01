import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LocationService } from '@app/_services/location.service';
import _ from 'lodash';
import { AdminService } from '@app/_services/admin.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-applicant',
  templateUrl: './add-applicant.component.html',
  styleUrls: ['./add-applicant.component.scss']
})
export class AddApplicantComponent implements OnInit {
  addApplicantForm: FormGroup;
  genderOptions: any = [
    { name: 'MALE', value: 'MALE' },
    { name: 'FEMALE', value: 'FEMALE' }
  ];
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
  regions: any[];
  countries: any[];
  cities: any[];
  cvFileTypes = '.pdf,.doc,.docx';
  loading;
  submitted;
  formData = new FormData();
  applicantAdded: boolean;
  defaultLimit = { max: '35', min: '0' };
  numberRange = { max: '20', min: '10' };
  bigLimit = { max: '100', min: '6' };
  constructor(
    private adminService: AdminService,
    private formBuilder: FormBuilder,
    private _location: Location,
    private locationService: LocationService
  ) {}

  ngOnInit() {
    this.getCountries();
    this.getRegions();

    this.addApplicantForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      currentEmployer: [''],
      currentOccopation: [''],
      address: [''],
      phoneNumber: ['', Validators.required],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      selfDescription: ['', Validators.required],
      cv: ['', Validators.required],
      applicantPicture: [''],
      CityId: ['', Validators.required],
      RegionId: ['', Validators.required],
      CountryId: ['', Validators.required]
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

        this.addApplicantForm.controls['CountryId'].setValue(countries[0].id);
      },
      error => console.log(error)
    );
  }

  selectChanged(value, name) {
    if (name == 'RegionId') {
      this.getCitiesByRegionId(value);
    }
    this.addApplicantForm.controls[name].setValue(value);
  }

  dateChanged(value, name) {
    this.addApplicantForm.controls['dateOfBirth'].setValue(value);
  }

  fileChanged(value, name) {
    this.formData.append(name, value, value.name);
  }

  onSubmit() {
    this.submitted = true;

    if (this.addApplicantForm.invalid) {
      return;
    }
    this.loading = true;

    let val = this.addApplicantForm.value;
    _.map(val, (value, key) => {
      if (key != 'applicantPicture' && key != 'cv') {
        this.formData.append(key, value);
      }
    });
    this.formData.append('username', `${this.addApplicantForm.controls['email'].value}`);

    //@ts-ignore
    // for (var pair of this.formData.entries()) {
    // }

    this.adminService.addApplicant(this.formData).subscribe(
      data => {
        this.loading = false;
        if (data.success) {
          this.applicantAdded = true;
          setTimeout(() => {
            this.applicantAdded = false;
            this._location.back();
          }, 3500);
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}
