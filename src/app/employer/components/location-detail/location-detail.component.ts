import { Component, OnInit } from "@angular/core";
import { EmployerService } from "@app/_services/employer.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { marker, icon, Point, tileLayer, latLng, LatLng } from "leaflet";
import { faEdit, faCamera, faTimes } from "@fortawesome/free-solid-svg-icons";
import _ from "lodash";
import { LocationService } from "@app/_services/location.service";

@Component({
  selector: "app-location-detail",
  templateUrl: "./location-detail.component.html",
  styleUrls: ["./location-detail.component.scss"]
})
export class LocationDetailComponent implements OnInit {
  location: any;
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
    inputHeader: { fontSize: "1.5rem", borderBottom: "1px solid #888" },
    optionContainer: {
      backgroundColor: "#555",
      top: "3.3rem",
      boxShadow: "0px 1px 2px #aaa"
    },
    option: {
      fontSize: "1.5rem",
      borderBottom: "1px solid #ddd",
      backgroundColor: "#fff"
    }
  };
  isModalVisible: boolean = false;
  pictureUpdate: FormGroup;
  imageData = new FormData();
  uploading: boolean = false;
  options = {
    layers: [
      tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: "..."
      })
    ],
    zoom: 20,
    center: latLng(14.6042, 120.9822)
  };
  latitude: any;
  longitude: any;
  id: string;
  loading: boolean;
  editSuccess: boolean;
  modalImgSrc: string | ArrayBuffer;
  formImgSrc: any;

  constructor(
    private employerService: EmployerService,
    private locationService: LocationService,
    private formBuilder: FormBuilder,
    private Route: ActivatedRoute,
    private router: Router,
    private _location: Location
  ) {}

  ngOnInit() {
    this.id = this.Route.snapshot.params.id;

    this.getCountries();
    this.getRegions();

    this.locationForm = this.formBuilder.group({
      locationName: [{ value: "", disabled: true }, Validators.required],
      locationPhoneNumber: [{ value: "", disabled: true }, Validators.required],
      email: [{ value: "", disabled: true }, Validators.required],
      address: [{ value: "", disabled: true }],
      cityId: [{ value: "", disabled: true }, Validators.required],
      regionId: [{ value: "", disabled: true }, Validators.required],
      countryId: [{ value: "", disabled: true }, Validators.required],
      isHeadOffice: [false]
    });

    this.employerService.getCompanyLocationById(this.id).subscribe(
      data => {
        if (data.success) {
          // console.log(data.location);
          this.location = data.location;
          this.modalImgSrc = data.location.picture;
          this.formImgSrc = data.location.picture;
          // let {latitude, longitude} = this.location;
          this.updateInputs();
          ({
            latitude: this.latitude,
            longitude: this.longitude
          } = data.location);
          this.options.center = latLng(this.latitude, this.longitude);
          this.marker = marker([this.latitude, this.longitude], {
            icon: icon({
              iconSize: [25, 41],
              iconAnchor: [13, 41],
              iconUrl: "assets/marker-icon.png",
              shadowUrl: "assets/marker-shadow.png"
            }),
            draggable: true,
            autoPan: true,
            autoPanPadding: new Point(70, 70)
          });
          this.marker.on("dragend", e => {
            ({ lat: this.latitude, lng: this.longitude } = e.target._latlng);
          });
        } else {
          console.log(data);
        }
      },
      error => {
        console.log(error);
      }
    );

    this.pictureUpdate = this.formBuilder.group({
      picture: ["picture"]
    });

    // console.log(this.form)
  } // ngOnInit ends here

  updateInputs() {
    _.map(this.location, (value, key) => {
      if (this.locationForm.controls[key] && key !== "picture") {
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

        this.locationForm.controls["countryId"].setValue(countries[0].id);
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
    if (name == "regionId") {
      this.getCitiesByRegionId(value);
    }
    this.locationForm.controls[name].setValue(value);
  }

  enableEdit() {
    Object.keys(this.locationForm.controls).forEach(controlName => {
      this.locationForm.controls[controlName].enable();
    });
    this.isDisabled = false;
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

  mapClicked(e) {
    let { lat, lng } = e.latlng;
    this.marker.setLatLng(new LatLng(lat, lng));
    ({ lat: this.latitude, lng: this.longitude } = e.latlng);
  }

  fileChanged(value, name) {
    this.imageData.delete(name); // to reset the imageData

    let reader = new FileReader();
    reader.onload = (e: Event) => {
      // console.log(e.target, "target")
      this.modalImgSrc = reader.result;
    };
    reader.readAsDataURL(value);

    this.imageData.append(name, value, value.name);

    //@ts-ignore
    // for (var pair of this.imageData.entries()) {
    //   console.log(pair[0], pair[1], "after update")
    // }
  }

  onUpdatePicture() {
    this.uploading = true;
    this.employerService
      .editCompanyBranchPicture(this.imageData, this.id)
      .subscribe(
        data => {
          console.log(data);
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
    //@ts-ignore
    // for (var pair of this.formData.entries()) {
    //   console.log(pair[0], pair[1])
    // }
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
    console.log(newLocation);
    this.employerService.editCompanyBranch(newLocation, this.id).subscribe(
      data => {
        console.log(data);
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
