import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faEdit, faCamera, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { tileLayer, latLng, marker, icon, Point, LatLng } from 'leaflet';
import { Location } from '@angular/common';
import { LocationService } from '@app/_services/location.service';
import _ from 'lodash';
import { AdminService } from '@app/_services/admin.service';
import { OpenStreetMapProvider, GeoSearchControl } from 'leaflet-geosearch';
import * as L from 'leaflet';

@Component({
  selector: 'app-company-location-detail',
  templateUrl: './company-location-detail.component.html',
  styleUrls: ['./company-location-detail.component.scss']
})
export class CompanyLocationDetailComponent implements OnInit {
  location;
  marker: any;
  editable: boolean = false;
  locationForm: any;
  isDisabled: boolean = true;
  countries = [];
  regions = [];
  cities = [];
  faEdit = faEdit;
  faCamera = faCamera;
  faTimes = faTimes;
  submitted = false;
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
  isModalVisible: boolean = false;
  pictureUpdate: FormGroup;
  imageData = new FormData();
  uploading: boolean = false;
  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
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
  modalImgSrc: string | ArrayBuffer;
  formImgSrc: any;
  defaultLimit = { max: '50', min: '0' };
  map: any;
  constructor(
    private formBuilder: FormBuilder,
    private Route: ActivatedRoute,
    private locationService: LocationService,
    private _location: Location,
    private adminService: AdminService
  ) {
    this.Route.data.subscribe(res => {
      let location = res.location;
      if (location.success) {
        this.location = location.location;
        res.helpers.countries.map(country => {
          this.countries.push({ name: country.countryName, value: country.id });
        });
        res.helpers.regions.map(region => {
          this.regions.push({ name: region.regionName, value: region.id });
        });
      }
    });
    this.id = this.Route.snapshot.params.locationId;
  }

  ngOnInit() {
    this.locationForm = this.formBuilder.group({
      locationName: [{ value: '', disabled: true }, Validators.required],
      locationPhoneNumber: [{ value: '', disabled: true }, Validators.required],
      email: [{ value: '', disabled: true }, Validators.required],
      address: [{ value: '', disabled: true }],
      cityId: [{ value: '', disabled: true }, Validators.required],
      regionId: [{ value: '', disabled: true }, Validators.required],
      countryId: [{ value: '', disabled: true }, Validators.required],
      isHeadOffice: [false]
    });

    this.modalImgSrc = this.location.picture;
    this.formImgSrc = this.location.picture;
    // let {latitude, longitude} = this.location;
    this.updateInputs();
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

    this.pictureUpdate = this.formBuilder.group({
      picture: ['picture']
    });
  } // ngOnInit ends here

  updateInputs() {
    _.map(this.location, (value, key) => {
      if (this.locationForm.controls[key] && key !== 'picture') {
        this.locationForm.controls[key].setValue(value);
      }
    });
    this.getCitiesByRegionId(this.location.regionId);
  }

  get form() {
    return this.locationForm.controls;
  }

  getCountries() {
    this.locationService.getAllCountries().subscribe(
      response => {
        const countries = response.countries;
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
        regions.map(region => {
          this.regions.push({ name: region.regionName, value: region.id });
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
    }
    this.locationForm.controls[name].setValue(value);
  }

  enableEdit() {
    this.isDisabled = false;
    Object.keys(this.locationForm.controls).forEach(controlName => {
      this.locationForm.controls[controlName].enable();
    });
  }

  showModal() {
    if (this.isModalVisible) {
      this.modalImgSrc = this.location.picture;
    }
    this.isModalVisible = !this.isModalVisible;
  }

  goBack() {
    this._location.back();
  }


  onMapReady(map: L.Map) {
    this.map = map;

    const provider = new OpenStreetMapProvider();
    
    const searchControl = new GeoSearchControl({
      provider: provider,
      autoCompleteDelay: 300,
      autoClose: true,
      showMarker: false,
    });
    this.map.addControl(searchControl);
    searchControl.getContainer().onclick = e => { e.stopPropagation(); };
    this.map.on('geosearch/showlocation', (e) => {
      let { lat, lng } = e.marker._latlng;
      this.marker.setLatLng(new LatLng(lat, lng));
      ({ lat: this.latitude, lng: this.longitude } = e.marker._latlng);
    })
  }

  mapClicked(e) {
    let { lat, lng } = e.latlng;
    this.marker.setLatLng(new LatLng(lat, lng));
    ({ lat: this.latitude, lng: this.longitude } = e.latlng);
  }

  fileChanged(value, name) {
    this.imageData.delete(name); // to reset the imageData

    let reader = new FileReader();
    reader.onload = (e: Event) => {
      this.modalImgSrc = reader.result;
    };
    reader.readAsDataURL(value);

    this.imageData.append(name, value, value.name);
  }

  onUpdatePicture() {
    this.uploading = true;
    this.adminService.editCompanyBranchPicture(this.imageData, this.id).subscribe(
      data => {
        this.formImgSrc = data.location.picture;
        this.uploading = false;
        this.showModal();
        this.editSuccess = true;
        setTimeout(() => {
          this.editSuccess = false;
        }, 4000);
      },
      error => {
        console.log(error);
      }
    );
  }

  onSubmit() {
    this.submitted = true;
    if (this.locationForm.invalid) {
      return;
    }
    this.loading = true;
    let newLocation = {
      ...this.locationForm.value,
      latitude: this.latitude,
      longitude: this.longitude
    };
    this.adminService.editCompanyBranch(newLocation, this.id).subscribe(
      data => {
        this.loading = false;
        if (data.success) {
          this.editSuccess = true;
          setTimeout(() => {
            this.editSuccess = false;
            this.goBack();
          }, 3000);
        } else {
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}
