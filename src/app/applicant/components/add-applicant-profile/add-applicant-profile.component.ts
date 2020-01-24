import { ApplicantService } from "./../../../_services/applicant.service";
import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { LocationService } from "@app/_services/location.service";
import _ from "lodash";
import {
  faCheck,
  faUserPlus,
  faIdCard,
  faCloudUploadAlt,
  faUserCheck,
  faEyeDropper,
  faEdit,
  faCamera,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import { Router } from "@angular/router";
import { AuthenticationService } from "@app/_services/authentication-service.service";
import { ImageCroppedEvent } from "ngx-image-cropper";

@Component({
  selector: "app-add-applicant-profile",
  templateUrl: "./add-applicant-profile.component.html",
  styleUrls: ["./add-applicant-profile.component.scss"]
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
    { name: "MALE", value: "MALE" },
    { name: "FEMALE", value: "FEMALE" }
  ];
  monthOptions = [
    { name: "January", value: "01" },
    { name: "February", value: "02" },
    { name: "March", value: "03" },
    { name: "April", value: "04" },
    { name: "May", value: "05" },
    { name: "June", value: "06" },
    { name: "July", value: "07" },
    { name: "August", value: "08" },
    { name: "September", value: "09" },
    { name: "October", value: "10" },
    { name: "November", value: "11" },
    { name: "December", value: "12" }
  ];
  hasProfile: boolean = false;
  submitted: boolean = false;
  styleObject = {
    inputContainer: {},
    input: { fontSize: "1.7rem" },
    inputHeader: { fontSize: "1.7rem", borderBottom: "1px solid #888" },
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
  monthStyle = {
    inputContainer: { margin: "0" },
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
  dateStyle = {
    inputContainer: { marginRight: "0" },
    input: {},
    label: {},
    feedbackContainer: {},
    feedbackMessage: {}
  };
  formErrors = ["Some form elements are not valid."];
  cvFileTypes = ".pdf,.doc,.docx";
  profilePictureFileTypes = ".png, .jpg, jpeg";
  inputType: string = "file";
  showLoader = false;
  showCVPreview = false;

  isCVEditModalOpen = false;
  isApplicantPictureEditModalOpen = false;
  yearRange = { min: "1920", max: "2020" };
  dateRange = { min: "1", max: "31" };
  imageChangedEvent: any;
  croppedImage: any;
  tempImg: string;

  constructor(
    private formBuilder: FormBuilder,
    private locationService: LocationService,
    private applicantService: ApplicantService,
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.getRegions();
    this.getCountries();

    this.addApplicantProfileForm = this.formBuilder.group({
      fullName: ["", Validators.required],
      phoneNumber: ["", Validators.required],
      firstName: [""],
      lastName: [""],
      currentEmployer: [""],
      currentOccopation: [""],
      address: [""],
      gender: ["", Validators.required],
      year: ["", Validators.required],
      month: ["", Validators.required],
      date: ["", Validators.required],
      dateOfBirth: ["", Validators.required],
      selfDescription: ["", [Validators.required, Validators.maxLength(1500)]],
      cv: ["", Validators.required],
      applicantPicture: [""],
      CityId: ["", Validators.required],
      RegionId: ["", Validators.required],
      CountryId: ["", Validators.required]
    });

    if (this.applicantProfile) {   
      this.hasProfile = true;
      this.inputType = "text";
      this.updateForm();
      console.log(this.applicantProfile);
      this.disableEdit();
      this.getCitiesByRegionId(this.applicantProfile.RegionId);
      this.getRegions();
    }
  }

  selectChanged(value, name) {
    if (name == "RegionId") {
      this.getCitiesByRegionId(value);
    }
    this.addApplicantProfileForm.controls[name].setValue(value);
  }

  updateForm() {
    let temp_date = new Date(this.applicantProfile.dateOfBirth);
      
    this.applicantProfile = {
      ...this.applicantProfile,
      year: temp_date.getFullYear(),
      month: temp_date.getMonth() + 1,
      date: temp_date.getDate(),
      fullName: `${this.applicantProfile.user.firstName} ${this.applicantProfile.user.lastName}`,
      phoneNumber: this.applicantProfile.user.phoneNumber
    };

    _.map(this.applicantProfile, (value, key) => {
      if (this.addApplicantProfileForm.controls[key] && key != "cv" && key != "applicantPicture") {
        this.addApplicantProfileForm.controls[key].setValue(value);
      }
    });

    // console.log(this.addApplicantProfileForm.value)
  }

  fileChanged(value, name) {
    this.formData.append(name, value, value.name);
  }

  imageChanged(event: any) {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event;
  }

  closeImageModal() {
    this.imageChangedEvent = "";
    this.selectedImage = "";
  }

  saveImage() {
    this.tempImg = this.croppedImage.base64;
    this.closeImageModal();
    let byteCharacters = atob(this.tempImg.split(",")[1]);
    let byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    let byteArray = new Uint8Array(byteNumbers);
    let blob = new Blob([byteArray], { type: "image/png" });

    this.formData.append("applicantPicture", blob);
  }

  onSubmit() {
    this.submitted = true;
    let val = this.addApplicantProfileForm.value;
    let date = `${val.year}-${val.month}-${val.date}`;

    if (new Date(date).toDateString().includes("Invalid")) {
      this.addApplicantProfileForm.controls["month"].setErrors({
        invalid: true
      });
      return;
    }

    this.addApplicantProfileForm.controls["dateOfBirth"].setValue(date);
    // console.log(this.addApplicantProfileForm.value);
    if (this.addApplicantProfileForm.invalid) {
      return;
    }

    // new form value after date of birth is added
    val = this.addApplicantProfileForm.value;
    this.showLoader = true;
    _.map(val, (value, key) => {
      // console.log(key, "=>", value);
      if (key != "cv" && key != "applicantPicture") {
        this.formData.append(key, value);
      }
    });
    // console.log(this.addApplicantProfileForm.value);

    this.applicantService.addApplicantProfileWithCV(this.formData).subscribe(
      data => {
        // console.log(data);
        if (data.success) {
          this.showLoader = false;
          let currentUser = this.authService.currentUserValue;
          this.authService.updateCurrentUser({
            ...currentUser,
            hasFinishedProfile: true,
            applicantProfile: data.applicantProfile
          });
          this.router.navigate(["/applicant/jobs"]);
        } else {
          this.submitted = false;
          this.showLoader = false;
        }
      },
      err => {
        console.log(err);
        this.showLoader = false;
      }
    );
  }

  onEdit() {
    this.submitted = true;
    let val = this.addApplicantProfileForm.value;
    let date = `${val.year}-${val.month}-${val.date}`;

    if (new Date(date).toDateString().includes("Invalid")) {
      this.addApplicantProfileForm.controls["month"].setErrors({
        invalid: true
      });
      return;
    }
    let nameArray = val.fullName.split(" ");
    let lastName = nameArray.slice(1).join(" "); // in case value includes grandfather's name

    this.addApplicantProfileForm.controls["firstName"].setValue(nameArray[0]);
    this.addApplicantProfileForm.controls["lastName"].setValue(lastName);
    this.addApplicantProfileForm.controls["dateOfBirth"].setValue(date);
    if (this.addApplicantProfileForm.invalid) {
      return;
    }

    val = this.addApplicantProfileForm.value;
    this.showLoader = true;

    _.map(val, (value, key) => {
      console.log(key,"=>", value)
      if (key != "cv" && key != "applicantPicture") {
        this.formData.append(key, value);
      }
    });

    this.applicantService.editApplicantProfile(this.formData, this.applicantProfile.id)
      .subscribe(
        data => {
          console.log(data);
          if (data.success) {
            this.applicantProfile = data.applicantProfile;
            this.updateForm();
            this.showLoader = false;
            this.tempImg = "";
            let currentUser = this.authService.currentUserValue;
            this.authService.updateCurrentUser({
              ...currentUser,
              applicantProfile: data.applicantProfile
            });
            this.disableEdit();
            this.formData = new FormData();
          }
        },
        err => {
          console.log(err);
          this.showLoader = false;
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

        this.addApplicantProfileForm.controls["CountryId"].setValue(
          countries[0].id
        );
      },
      error => console.log(error)
    );
  }

  enableEdit(event) {
    event.stopPropagation();
    this.hasProfile = false;
    _.map(this.applicantProfile, (value, key) => {
      if (this.addApplicantProfileForm.controls[key]) {
        if (!["cv"].includes(key)) {
          this.addApplicantProfileForm.controls[key].enable();
        }
      }
    });
    this.addApplicantProfileForm.controls["year"].enable();
    this.addApplicantProfileForm.controls["date"].enable();
  }

  disableEdit() {
    this.hasProfile = true;
    _.map(this.applicantProfile, (value, key) => {
      if (this.addApplicantProfileForm.controls[key]) {
        this.addApplicantProfileForm.controls[key].disable();
      }
    });
    this.addApplicantProfileForm.controls["year"].disable();
    this.addApplicantProfileForm.controls["date"].disable();
  }

  onCVPreview(event) {
    event.stopPropagation();
    this.showCVPreview = !this.showCVPreview;
  }

  toggleCVModal(event) {
    this.isCVEditModalOpen = !this.isCVEditModalOpen;
  }

  toggleApplicantPictureModal() {
    this.isApplicantPictureEditModalOpen = !this
      .isApplicantPictureEditModalOpen;
  }

  editCVChanged(event) {
    console.log(event);
  }

  applicantUpdated(event) {
    this.applicantProfile = event;
    this.applicantProfile.dateOfBirth = this.applicantProfile.dateOfBirth
      ? this.applicantProfile.dateOfBirth.split("T")[0]
      : null;
    let currentUser = this.authService.currentUserValue;
    this.authService.updateCurrentUser({
      ...currentUser,
      hasFinishedProfile: true,
      applicantProfile: event
    });
    this.updateForm();
    // console.log(event);
  }
}
