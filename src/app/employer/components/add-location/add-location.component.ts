import { LocationService } from '@app/_services/location.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployerService } from '@app/_services/employer.service';
import { first } from 'rxjs/operators';
import _ from 'lodash';
import { tileLayer, latLng, marker, Point, LatLng, icon } from 'leaflet';
import { AuthenticationService } from '@app/_services/authentication-service.service';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { OpenStreetMapProvider, GeoSearchControl } from 'leaflet-geosearch';
import * as L from 'leaflet';

@Component({
  selector: 'app-add-company-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.scss']
})
export class AddLocationComponent implements OnInit {
  faCheckCircle = faCheckCircle;
  faTimesCircle = faTimesCircle;
  cities = [];
  regions = [];
  countries = [];
  locationForm: FormGroup;
  submitted: boolean;
  selectStyle = {
    inputContainer: {},
    inputHeader: { fontSize: '1.5rem', borderBottom: '1px solid #888' },
    optionContainer: { backgroundColor: '#555', top: '3.3rem', boxShadow: '0px 1px 2px #aaa' },
    option: { fontSize: '1.5rem', borderBottom: '1px solid #ddd', backgroundColor: '#fff' }
  };
  loading: boolean;
  locationTracked: boolean = false;
  showMap: boolean = false;
  marker;
  manualMarker: L.Layer[] = [];
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
  defaultLimit = { max: '40', min: '0' };
  numberRange = { max: '20', min: '10' };
  hasLocations: boolean;
  mustBeBranch: boolean;
  toggleConfirmModal: boolean;
  map: any;
  failure: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private employerService: EmployerService,
    private authenticationService: AuthenticationService,
    private locationService: LocationService,
    private Route: ActivatedRoute,
    private _location: Location
  ) {
    this.Route.data.subscribe(res => {
      let data = res.data;
      if (data.success) {
        this.mustBeBranch = !!data.heads.length;
      } else {
        this._location.back();
      }
    });
    this.hasLocations = this.authenticationService.currentUserValue.company_profile.hasLocations;
  }

  ngOnInit() {
    this.getRegions();
    this.getCountries();
    this.locationForm = this.formBuilder.group({
      locationName: ['', Validators.required],
      locationPhoneNumber: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      address: ['', Validators.required],
      picture: ['picture'],
      cityId: ['', Validators.required],
      regionId: ['', Validators.required],
      countryId: ['', Validators.required],
      isHeadOffice: [!this.hasLocations]
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          let { latitude, longitude } = pos.coords;
          ({ latitude: this.latitude, longitude: this.longitude } = pos.coords);
          this.options.center = latLng(latitude, longitude);
          this.marker = marker([latitude, longitude], {
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
          this.locationTracked = true;
        },
        err => {
          this.showMap = true;
          // let { latitude, longitude } = {
          //   latitude: 14.6042,
          //   longitude: 120.9822
          // };
          // ({ latitude: this.latitude, longitude: this.longitude } = {
          //   latitude: 14.6042,
          //   longitude: 120.9822
          // });
        }
      );
    } else {
    }
  } //ngOnInit Ends...

  //  convenience getter for easy access to form fields
  get f() {
    return this.locationForm.controls;
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
    if(this.formData.has(name)) {
      this.formData.delete(name);
    }
    this.formData.append(name, value, value.name);
  }

  selectChanged(value, name) {
    if (name == 'regionId') {
      this.getCitiesByRegionId(value);
      this.locationForm.controls['cityId'].setValue(null);
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

  mapClicked(e) {
    let { lat, lng } = e.latlng;
    if (this.marker) {
      this.marker.setLatLng(new LatLng(lat, lng));
    } else {
      this.manualMarker = [];
      let newMarker = marker([lat, lng], {
        icon: icon({
          iconSize: [22, 38],
          iconAnchor: [13, 41],
          iconUrl: 'assets/marker-icon.png',
          shadowUrl: 'assets/marker-shadow.png'
        }),
        draggable: true
      });

      newMarker.on('dragend', e => {
        ({ lat: this.latitude, lng: this.longitude } = e.target._latlng);
      });
      this.manualMarker.push(newMarker);
    }

    ({ lat: this.latitude, lng: this.longitude } = e.latlng);
  }

  onMapReady(map: L.Map) {
    this.map = map;

    const provider = new OpenStreetMapProvider();

    const searchControl = new GeoSearchControl({
      provider: provider,
      autoCompleteDelay: 300,
      autoClose: true,
      showMarker: false
    });
    this.map.addControl(searchControl);
    searchControl.getContainer().onclick = e => {
      e.stopPropagation();
    };
    this.map.on('geosearch/showlocation', e => {
      let { lat, lng } = e.marker._latlng;
      if (this.marker) {
        this.marker.setLatLng(new LatLng(lat, lng));
      } else {
        this.manualMarker = [];
        let newMarker = marker([lat, lng], {
          icon: icon({
            iconSize: [22, 38],
            iconAnchor: [13, 41],
            iconUrl: 'assets/marker-icon.png',
            shadowUrl: 'assets/marker-shadow.png'
          }),
          draggable: true
        });

        newMarker.on('dragend', e => {
          ({ lat: this.latitude, lng: this.longitude } = e.target._latlng);
        });
        this.manualMarker.push(newMarker);
      }
      ({ lat: this.latitude, lng: this.longitude } = e.marker._latlng);
    });
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
    this.locationAdded = this.failure = this.locationError = false;
    if (this.locationForm.invalid) {
      return;
    }
    let val = this.locationForm.value;

    if (this.mustBeBranch && val.isHeadOffice) {
      this.toggleConfirmModal = true;
    } else {
      _.map(val, (value, key) => {
        if (key != 'picture') {
          this.formData.append(key, value);
        }
      });

      if (!this.latitude) {
        this.locationError = true;
        setTimeout(() => {
          this.locationError = false;
        }, 4750);
        return;
      }
      this.formData.append('latitude', this.latitude);
      this.formData.append('longitude', this.longitude);
      //@ts-ignore
      this.formData.append('companyProfileId', this.authenticationService.currentUserValue.companyProfileId);

      var names = [];
      //@ts-ignore
      for (var pair of this.formData.entries()) {
        names.push(pair[0]);
      }

      this.loading = true;
      this.employerService.addCompanyBranch(this.formData).pipe(first()).subscribe(
          data => {
            if (data.success) {
              this.loading = false;
              this.submitted = false;
              // this.locationForm.reset();
              this.locationAdded = true;

              const user = this.authenticationService.currentUserValue;
              if (user.company_profile) {
                // ts-ignore
                user.company_profile.hasLocations = true;

                this.authenticationService.updateCurrentUser(user);
              }
            } else {
              this.loading = false;
              data.validationError ? this.error = data.validationError : this.failure = true;
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
