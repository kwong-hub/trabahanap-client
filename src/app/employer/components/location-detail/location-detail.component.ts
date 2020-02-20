import { Component, OnInit } from '@angular/core';
import { EmployerService } from '@app/_services/employer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { marker, icon, Point, tileLayer, latLng, LatLng } from 'leaflet';
import { faEdit, faCamera, faTimes } from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash';
import { LocationService } from '@app/_services/location.service';

@Component({
  selector: 'app-location-detail',
  templateUrl: './location-detail.component.html',
  styleUrls: ['./location-detail.component.scss']
})
export class LocationDetailComponent implements OnInit {
  location: any;
  marker: any;
  editable: boolean = false;
  locationForm: any;
  countries
  regions
  cities
  faEdit = faEdit;
  faCamera = faCamera;
  faTimes = faTimes;
  submitted = false;
  selectStyle = {
    inputContainer: {},
    inputHeader: { fontSize: '1.5rem', borderBottom: '1px solid #888' },
    optionContainer: { backgroundColor: '#555', top: '3.3rem', boxShadow: '0px 1px 2px #aaa' },
    option: { fontSize: '1.5rem', borderBottom: '1px solid #ddd', backgroundColor: '#fff' }
  };
  isModalVisible: boolean = false;
  pictureUpdate: FormGroup;
  formData = new FormData();
  uploading: boolean = false;
  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '...'
      })
    ],
    zoom: 20,
    center: latLng(14.6042, 120.9822),
    attributionControl: false
  };
  latitude: any;
  longitude: any;
  id: string;
  loading: boolean;
  editSuccess: boolean;
  tempImg: string | ArrayBuffer;
  defaultLimit ={max:"50",min:"0"};
  nameLimit ={max:"40",min:"0"};
  numberRange ={max:'18',min:'10'};
  mustBeBranch: boolean;
  toggleConfirmModal: boolean;

  constructor(
    private employerService: EmployerService,
    private locationService: LocationService,
    private formBuilder: FormBuilder,
    private Route: ActivatedRoute,
    private _location: Location
  ) {
    this.Route.data.subscribe(res => {
      let data = res.data;
      if (data.success) {
        this.location = data.location.location;
        this.mustBeBranch = !!data.location.heads.length && !this.location.isHeadOffice;
      } else {
        this._location.back();
      }
    });
  }

  ngOnInit() {
    this.id = this.Route.snapshot.params.id;
    this.locationForm = this.formBuilder.group({
      picture: [''],
      locationName: ['', Validators.required],
      locationPhoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      cityId: ['', Validators.required],
      regionId: ['', Validators.required],
      countryId: ['', Validators.required],
      isHeadOffice: [false]
    });

    this.updateInputs();

    this.getCountries();
    this.getRegions();
    // this.getCities();

    ({ latitude: this.latitude, longitude: this.longitude } = this.location);
    this.options.center = latLng(this.latitude, this.longitude);
    this.marker = marker([this.latitude, this.longitude], {
      icon: icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: 'assets/marker-icon.png',
        shadowUrl: 'assets/marker-shadow.png'
      }),
      draggable: true,
      autoPan: true,
      autoPanPadding: new Point(70, 70)
    });
    this.marker.on('dragend', e => {
      ({ lat: this.latitude, lng: this.longitude } = e.target._latlng);
    });

    // console.log(this.locationForm.controls)
  } // ngOnInit ends here

  updateInputs() {
    this.getCitiesByRegionId(this.location.regionId);
    _.map(this.location, (value, key) => {
      if (this.locationForm.controls[key] && key !== 'picture') {
        this.locationForm.controls[key].setValue(value);
      }
    });
    // this.checkbox.nativeElement. = true;
  }

  get form() {
    return this.locationForm.controls;
  }

  getCountries() {
    this.locationService.getAllCountries().subscribe(
      response => {
        const countries = response.countries;
        this.countries = [];
        countries.map(country => {
          this.countries.push({ name: country.countryName, value: country.id });
        });

        this.locationForm.controls['countryId'].setValue(countries[0].id);
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

  selectChanged(value, name) {
    if (name == 'regionId') {
      this.getCitiesByRegionId(value);
      this.locationForm.controls['cityId'].setValue(null);
    }
    this.locationForm.controls[name].setValue(value);
  }

  goBack() {
    this._location.back();
  }

  mapClicked(e) {
    let { lat, lng } = e.latlng;
    this.marker.setLatLng(new LatLng(lat, lng));
    ({ lat: this.latitude, lng: this.longitude } = e.latlng);
  }

  imageChanged(event) {
    this.formData = new FormData();
    let val = event.target.files[0] ? event.target.files[0] : null;
    let reader = new FileReader();
    reader.onload = (e: Event) => {
      this.tempImg = reader.result;
    };
    reader.readAsDataURL(val);
    this.formData.append('picture', val, val.name);
  }

  confirmAction() {
    this.toggleConfirmModal = false;
    this.mustBeBranch = false;
    this.onSubmit();
  }

  cancelAction() {
    this.toggleConfirmModal = false;
  }

  onSubmit() {
    this.submitted = true;
    if (this.locationForm.invalid) {
      return;
    }

    let newLocation = { ...this.locationForm.value, isHeadOffice: !!this.locationForm.value.isHeadOffice, latitude: this.latitude, longitude: this.longitude };

    if(this.mustBeBranch && newLocation.isHeadOffice) {
      this.toggleConfirmModal = true;
    }
    else {
      this.loading = true;
      this.editSuccess = false;

      _.map(newLocation, (value, key) => {
        if (key != 'picture') {
          this.formData.append(key, value);
        }
      });

      //@ts-ignore
      // for (var pair of this.formData.entries()) {
      // }

      this.employerService.editCompanyBranch(this.formData, this.id).subscribe(
        data => {
          this.loading = false;
          if (data.success) {
            this.editSuccess = true;
          } else {
            console.log(data)
          }
        },
        error => {
          console.log(error);
        }
      );
    }
  }
}
