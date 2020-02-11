import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/_services/authentication-service.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-auth-password-reset',
  templateUrl: './auth-password-reset.component.html',
  styleUrls: ['./auth-password-reset.component.scss']
})
export class AuthPasswordResetComponent implements OnInit {
  faLock = faLock;
  faEnvelope = faEnvelope;
  resetForm: FormGroup;
  submitted: boolean;
  loading: boolean;
  error: any;
  success: any;

  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService) {}

  ngOnInit() {
    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get f() {
    return this.resetForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.resetForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.resetPassword(this.f.email.value).subscribe(
      data => {
        console.log(data)
        this.loading = false;
        if (data.success) {
          this.error = '';
          this.success = data.response;
        } else {
          this.success = '';
          this.error = data.response;
          this.loading = false;
        }
      },
      error => {
        this.loading = false;
      }
    );
  }
}
