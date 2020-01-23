import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { MustMatch } from "@app/_helpers/must-match.validator";
import { AuthenticationService } from "@app/_services/authentication-service.service";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.scss"]
})
export class ChangePasswordComponent implements OnInit {
  passwordForm: FormGroup;
  submitted: boolean;
  loading: boolean = true;
  passwordType = "password";
  eyeIcon = faEyeSlash;
  error;
  success: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.passwordForm = this.formBuilder.group(
      {
        currentPassword: ["", [Validators.required, Validators.min(6)]],
        newPassword: ["", [Validators.required, Validators.min(6)]],
        confirmPassword: ["", [Validators.required, Validators.min(6)]]
      },
      {
        validator: MustMatch("newPassword", "confirmPassword")
      }
    );
  }

  get f() {
    return this.passwordForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.passwordForm.invalid) {
      console.log(this.f.currentPassword.errors);

      return;
    }
    this.loading = true;
    console.log();
    this.authService
      .changePassword(
        this.f.currentPassword.value,
        this.f.newPassword.value,
        this.f.confirmPassword.value
      )
      .subscribe(
        data => {
          console.log(data);
          this.submitted = false;
          if (data.success) {
            this.error = "";
            this.passwordForm.reset();
            this.success = true;
            setTimeout(() => {
              this.success = false;
            }, 4000);
          } else {
            this.error = data.response.msg;
          }
        },
        error => {
          console.log(error);
        }
      );
  }
}
