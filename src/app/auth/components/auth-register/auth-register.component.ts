import { Component, OnInit } from "@angular/core";
import { Role } from "@app/_models/Role";
import { first } from "rxjs/operators";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { MustMatch } from "@app/_helpers/must-match.validator";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { RegistrationService } from "@app/_services/registration.service";
import { AuthenticationService } from "@app/_services/authentication-service.service";

@Component({
  selector: "app-auth-register",
  templateUrl: "./auth-register.component.html",
  styleUrls: ["./auth-register.component.scss"]
})
export class AuthRegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted: boolean = false;
  loading: boolean = false;
  recaptchaResponse: string;
  empRegister: boolean = false;
  registerSuccess: boolean;
  passwordType = "password";
  styleObject = {
    inputContainer: {},
    input: { fontSize: "2.2rem" },
    label: { fontSize: "1.5rem" },
    feedbackContainer: {},
    feedbackMessage: { fontSize: "1.5rem" }
  };
  submitStyle = { btn: {width: "100%", borderRadius: "5px"}}
  eyeIcon = faEyeSlash;
  error;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private registrationService: RegistrationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // redirect to home if already logged in

    if (this.authenticationService.currentUserValue) {
      this.router.navigate(["/"]);
    }
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group(
      {
        firstName: ["", Validators.required],
        lastName: ["", Validators.required],
        email: [
          "",
          Validators.compose([Validators.required, Validators.email])
        ],
        phoneNumber: ["", Validators.required],
        password: ["", [Validators.required, Validators.minLength(6)]],
        passwordConfirm: ["", Validators.required],
        recaptcha: ["", Validators.required]
      },
      {
        validator: MustMatch("password", "passwordConfirm")
      }
    );

    let params = this.route.snapshot.queryParams;

    if (params["as"] === "emp") {
      this.empRegister = true;
    } else if (params["as"] === "app") {
      this.empRegister = false;
    }
  } // ngOnInit ends here

  //  convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  resolved(captchaResponse: string) {
    this.recaptchaResponse = captchaResponse;
    console.log(this.recaptchaResponse);
  }

  change() {
    let phone: string = this.f.phoneNumber.value;
  }

  closeSlide() {
    this.registerSuccess = false;
  }

  togglePasswordType() {
    if (this.passwordType === "password") {
      this.passwordType = "text";
      this.eyeIcon = faEye;
    } else {
      this.passwordType = "password";
      this.eyeIcon = faEyeSlash;
    }
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    if (this.empRegister) {
      // Register as Employer
      console.log("Registering as Employer");
      this.registrationService
        .registerEmployer({
          ...this.registerForm.value,
          username: this.registerForm.value.firstName,
          gender: "Male"
        })
        .pipe(first())
        .subscribe(
          data => {
            //@ts-ignore
            if (data.success) {
              this.registrationService.userData = {
                role: Role.employer,
                registred: true,
                email: this.registerForm.value.email
              };
              this.router.navigate(["/auth/register/success"]);
            }

            //@ts-ignore
            else if (data.validationError) {
              //@ts-ignore
              this.error = data.validationError.email;
              this.loading = false;
              //@ts-ignore
            }

            //@ts-ignore
            else if (data.error) {
              //@ts-ignore
              this.error = data.error;
              this.loading = false;
            }
            //@ts-ignore
            // else if(data.recaptchaError) {
            // //@ts-ignore
            //   this.error.recaptcha = data.recaptchaError;
            // //@ts-ignore
            // console.log(data.validationError);
            // }
          },
          error => {
            console.error(error);
            this.loading = false;
          }
        );
    } else {
      this.registrationService
        .registerApplicant({
          ...this.registerForm.value,
          username: this.registerForm.value.firstName
        })
        .pipe(first())
        .subscribe(
          data => {
            //@ts-ignore

            if (data.success) {
              console.log(data);
              this.registrationService.userData = {
                role: Role.applicant,
                registred: true,
                email: this.registerForm.value.email
              };
              this.router.navigate(["/auth/register/success"]);
            }

            //@ts-ignore
            else if (data.validationError) {
              //@ts-ignore
              this.error = data.validationError.email;
              this.loading = false;
              //@ts-ignore
            }

            //@ts-ignore
            else if (data.error) {
              //@ts-ignore
              this.error = data.error;
              this.loading = false;
            }
            console.log(data);
            //@ts-ignore
            // else if(data.recaptchaError) {
            // //@ts-ignore
            //   this.error.recaptcha = data.recaptchaError;
            // //@ts-ignore
            // console.log(data.validationError);
            // }
          },
          error => {
            console.error(error);
            this.loading = false;
          }
        );
    }
  }
}
