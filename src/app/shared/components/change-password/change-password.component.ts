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
  loading: boolean;
  passwordType = "password";
  eyeIcon = faEyeSlash;
  error;
  success: boolean;
  styleObject= { btn: {width: "100%", borderRadius: "5px"}}
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.passwordForm = this.formBuilder.group(
      {
        currentPassword: ["", [Validators.required, Validators.min(6),Validators.maxLength(24)]],
        newPassword: ["", [Validators.required, Validators.min(6),Validators.maxLength(24)]],
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
    this.success = false;
    if (this.passwordForm.invalid) {
      // console.log(this.f.currentPassword.errors);
      return;
    }
    this.loading = true;
    this.authService.changePassword(this.f.currentPassword.value, 
      this.f.newPassword.value, this.f.confirmPassword.value).subscribe(
          data => {
            this.loading = false;
            this.submitted = false;
            if (data.success) {
              this.error = "";
              this.success = true;
              this.passwordForm.reset();
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
