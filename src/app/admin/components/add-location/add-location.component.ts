import { Component, OnInit } from '@angular/core';
import { AdminService } from '@app/_services/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import _ from 'lodash';
import { LocationService } from '@app/_services/location.service';
import { Router, ActivatedRoute } from '@angular/router';
import { tileLayer, latLng, marker, icon, Point, LatLng } from 'leaflet';
import { Location } from '@angular/common';
import { OpenStreetMapProvider, GeoSearchControl } from 'leaflet-geosearch';
import * as L from 'leaflet';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.scss']
})
export class AddLocationComponent implements OnInit {
  companyId;
  regions = [];
  countries = [];
  locationForm: FormGroup;
  submitted: boolean;
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
  loading: boolean;
  locationTracked: boolean = false;
  showMap: boolean = false;
  marker;
  latitude;
  longitude;
  formData = new FormData();
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
  locationAdded: boolean;
  error;
  locationError: boolean;
  imageError: boolean;
  cities: any;
  defaultLimit = { max: '35', min: '0' };
  bigLimit = { max: '100', min: '6' };
  map: any;
  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private Route: ActivatedRoute,
    private locationService: LocationService,
    private _location: Location
  ) {}

  ngOnInit() {
    this.companyId = this.Route.snapshot.params.id;
    this.getRegions();
    this.getCountries();

    this.locationForm = this.formBuilder.group({
      locationName: ['', Validators.required],
      locationPhoneNumber: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      picture: ['picture'],
      cityId: ['', Validators.required],
      regionId: ['', Validators.required],
      countryId: ['', Validators.required],
      isHeadOffice: [false]
    });

    this.marker = marker([14.6042, 120.9822], {
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
    this.showMap = true;
  } // ngOnInit ends here

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

  fileChanged(value, name) {
    this.formData.append(name, value, value.name);
  }

  selectChanged(value, name) {
    if (name == 'regionId') {
      this.getCitiesByRegionId(value);
    }
    this.locationForm.controls[name].setValue(value);
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

  onSubmit() {
    this.submitted = true;
    if (this.locationForm.invalid) {
      return;
    }

    let val = this.locationForm.value;
    _.map(val, (value, key) => {
      if (key != 'picture') {
        this.formData.append(key, value);
      }
    });

    if (!this.latitude) {
      this.locationError = true;
      setTimeout(() => {
        this.locationError = false;
      }, 3500);
      return;
    }
    this.formData.append('latitude', this.latitude);
    this.formData.append('longitude', this.longitude);
    //@ts-ignore
    this.formData.append('companyProfileId', this.companyId);

    var names = [];
    //@ts-ignore
    for (var pair of this.formData.entries()) {
      names.push(pair[0]);
    }

    this.loading = true;

    this.adminService.addCompanyLocation(this.formData).subscribe(
      data => {
        if (data.success) {
          this.loading = false;
          this.submitted = false;
          this.locationForm.reset();
          this.locationAdded = true;

          setTimeout(() => {
            this.locationAdded = false;
            this._location.back();
          }, 2000);
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}
