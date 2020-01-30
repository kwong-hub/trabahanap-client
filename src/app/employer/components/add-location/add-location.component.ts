import { LocationService } from '@app/_services/location.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployerService } from '@app/_services/employer.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import _ from 'lodash';
import { tileLayer, latLng, marker, Point, LatLng, icon } from 'leaflet';
import { AuthenticationService } from '@app/_services/authentication-service.service';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

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
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '...'
      })
    ],
    zoom: 20,
    center: latLng(14.6042, 120.9822)
  };
  locationAdded: boolean;
  error;
  locationError: boolean;
  imageError: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private employerService: EmployerService,
    private authenticationService: AuthenticationService,
    private locationService: LocationService,
    private router: Router
  ) {}

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
      isHeadOffice: [false]
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
          let { latitude, longitude } = {
            latitude: 14.6042,
            longitude: 120.9822
          };
          ({ latitude: this.latitude, longitude: this.longitude } = {
            latitude: 14.6042,
            longitude: 120.9822
          });
          // console.log(this.showMap, "map else")
          console.log(err);
        }
      );
    } else {
      console.log('no geolocation');
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
    this.formData.append('companyProfileId', this.authenticationService.currentUserValue.companyProfileId);

    var names = [];
    //@ts-ignore
    for (var pair of this.formData.entries()) {
      // console.log(pair[0], pair[1])
      names.push(pair[0]);
    }
    // console.log(names, "names")

    // if(!names.includes('picture')) {
    //   this.imageError = true;
    //   setTimeout(() => {
    //     this.imageError = false;
    //   }, 3000);
    //   return;
    // }

    this.loading = true;
    this.employerService
      .addCompanyBranch(this.formData)
      .pipe(first())
      .subscribe(
        data => {
          if (data.success) {
            this.loading = false;
            this.submitted = false;
            this.locationForm.reset();
            this.locationAdded = true;

            const user = this.authenticationService.currentUserValue;
            if (user.company_profile) {
              // ts-ignore
              user.company_profile.hasLocations = true;

              this.authenticationService.updateCurrentUser(user);
            }

            setTimeout(() => {
              this.locationAdded = false;
              this.router.navigate(['/employer/branches']);
            }, 2000);
          } else {
            this.loading = false;
            //console.log(data, "error");
            this.error = data.validationError;
          }
        },
        error => {
          console.log(error);
          this.loading = false;
        }
      );
  }
}
