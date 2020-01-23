import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from '@app/_services/authentication-service.service';
// import { RegistrationSuccessfulComponent } from '../registration-successful/registration-successful.component';

@Component({
  selector: 'app-change-password-temp',
  templateUrl: './change-password-temp.component.html',
  styleUrls: ['./change-password-temp.component.scss']
})
export class ChangePasswordTempComponent implements OnInit {

  setPasswordForm: FormGroup;
  showSetPasswordForm = false;
  loading = false;
  submitted = false;
  homeUrl: string;
  error = '';
  returnUrl: any;
  token: any;
  eyeIcon = faEyeSlash;
  passwordType: string = "password";
  success: boolean = false;

  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe(
        res => {
          this.token = res['token'];
        },
        err => console.log(err)
      );
    this.setPasswordForm = this.formBuilder.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  get fSetPassword() { return this.setPasswordForm.controls; }

  onSetPasswordSubmit(){
    this.submitted = true;
    if (this.setPasswordForm.invalid) {
      return;
    }
    this.loading = true;

    this.authenticationService.setPassword({
      password: this.fSetPassword.password.value,
      confirmPassword: this.fSetPassword.confirmPassword.value,
      token: this.token
    })
    .subscribe(
      res => {
        this.loading = false;
        if(res.success){
          this.success = true;
          setTimeout(() => {
            this.success = false;
            this.router.navigate(['/login']);
          }, 3000)
        }else{
          this.error = res.error || res.message || "Unable to change you password!";
        }
      },
      err => console.log(err)
    );
  }

  togglePasswordType() {
    if(this.passwordType === "password") {
      this.passwordType = "text";
      this.eyeIcon = faEye;
    }
    
    else {
      this.passwordType = "password";
      this.eyeIcon = faEyeSlash;
    }
  }
}
