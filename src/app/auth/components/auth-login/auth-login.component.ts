import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AuthService, FacebookLoginProvider, SocialUser, GoogleLoginProvider } from 'angularx-social-login';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from '@app/_services/authentication-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Role } from '@app/_models/Role';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss']
})
export class AuthLoginComponent implements OnInit {
  emailForm: FormGroup;
  passwordForm: FormGroup;
  questionnaireForm: FormGroup;
  smsConfirmationForm: FormGroup;
  showEmailForm = true;
  showPasswordForm = false;
  showquestionnaireForm = false;
  showSmsConfirmationForm = false;
  showOptions = false;
  loading = false;
  submitted = false;
  homeUrl: string;
  error = '';
  registerType = 'applicant'; // who is to be registered: Employer or Applicant; default Applicant
  registerSuccess: boolean;
  returnUrl: any;
  user: SocialUser;
  lgUser: any = {};
  loggedIn: boolean;
  eyeIcon = faEyeSlash;
  passwordType: string = 'password';
  submitBtnStyle = {
    btn: { width: '100%', borderRadius: '5px', fontSize: '2.5rem' }
  };
  login = false;
  socialError = '';
  emailSent = false;
  messageSent = false;

  disable: any = {};

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private route: Router,
    private router: ActivatedRoute,
    private authService: AuthService
  ) {
    if (this.authenticationService.currentUserValue) {
      this.route.navigate([`/${this.authenticationService.currentUserValue.role.toLowerCase()}`]);
    }
  }

  ngOnInit() {
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
    this.passwordForm = this.formBuilder.group({
      password: ['', Validators.required]
    });
    this.questionnaireForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['']
    });
    this.smsConfirmationForm = this.formBuilder.group({
      passcode: ['', Validators.required]
    });

    this.router.queryParams.subscribe(
      res => {
        let questionnaire = res.questionnaire;
        let email = res.email;
        if (questionnaire == 'true' && email) {
          this.showEmailForm = false;
          this.getUserByEmail(email);
        }
      },
      err => console.log(err)
    );

    this.authService.authState.subscribe(user => {
      if (user && user.authToken && this.login) {
        if (!user.email) {
          this.error = 'Single Sign On has failed, please sign in manually.';
          return;
        }
        if (user.facebook) {
          this.authenticationService.facebookLogin(user.authToken, user.id, user, 'applicant').subscribe(
            response => {
              if (response.success) {
                this.authenticationService.saveSocialUser(response.user);
                this.navigateUser(response.user.role);
              } else {
                this.socialError = response.error;
              }
            },
            err => console.log(err)
          );
        } else {
          this.authenticationService.googleLogin(user.authToken, user.id, user, 'applicant').subscribe(
            response => {
              if (response.success) {
                this.authenticationService.saveSocialUser(response.user);
                this.navigateUser(response.user.role);
              } else {
                this.socialError = response.error;
              }
            },
            err => console.log(err)
          );
        }
      }
    });
  }

  togglePasswordType() {
    if (this.passwordType === 'password') {
      this.passwordType = 'text';
      this.eyeIcon = faEye;
    } else {
      this.passwordType = 'password';
      this.eyeIcon = faEyeSlash;
    }
  }

  get f() {
    return this.emailForm.controls;
  }

  get fPassword() {
    return this.passwordForm.controls;
  }

  get fQuestionnaire() {
    return this.questionnaireForm.controls;
  }

  get fSMS() {
    return this.smsConfirmationForm.controls;
  }

  onEmailSubmit() {
    this.submitted = true;
    if (this.emailForm.invalid) {
      return;
    }
    this.loading = true;

    this.authenticationService.getUserByEmail(this.f.email.value).subscribe(res => {
      this.loading = false;
      this.error = '';
      if (res.success) {
        this.lgUser = res.user;
        this.submitted = false;
        if (this.lgUser.hasPassword) {
          this.showEmailForm = false;
          this.showPasswordForm = true;
        } else {
          this.showEmailForm = false;
          this.showOptions = true;
        }
      } else {
        if (res.message.includes('connect') || res.message.includes('fail')) {
          this.error = 'Can Not Login';
        } else {
          this.error = res.error || res.message;
        }
      }
    });
  }

  onPasswordSubmit() {
    this.submitted = true;
    if (this.passwordForm.invalid) {
      return;
    }
    this.loading = true;
    this.authenticationService
      .login(this.lgUser.email, this.fPassword.password.value)
      .pipe(first())
      .subscribe(
        data => {
          if (data.success) {
            this.returnUrl = this.router.snapshot.queryParams['returnUrl'] || `/${data.user.role.toLowerCase()}`;
            this.route.navigate([this.returnUrl]);
          } else {
            this.error = data.user;
            this.loading = false;
          }
        },
        err => {
          this.loading = false;
          console.log(err);
        }
      );
  }

  onQuestionnaireSubmit() {
    this.submitted = true;
    if (this.questionnaireForm.invalid) {
      return;
    }
    this.loading = true;

    this.authenticationService
      .checkValidUser({
        email: this.lgUser.email,
        firstName: this.fQuestionnaire.firstName.value,
        lastName: this.fQuestionnaire.lastName.value,
        phoneNumber: this.fQuestionnaire.phoneNumber.value
      })
      .subscribe(res => {
        this.loading = false;
        this.error = '';
        if (res.success && res.user.valid) {
          this.submitted = false;
          this.showquestionnaireForm = false;
          this.route.navigate(['/auth/set-password'], {
            queryParams: { token: res.user.token }
          });
        } else {
          this.error = 'Invalid information try again.';
        }
      });
  }

  sendEmail() {
    this.disable['email'] = true;
    this.authenticationService.resetPassword(this.lgUser.email).subscribe(res => {
      if (res.success) {
        this.emailSent = true;
        this.route.navigate(['/auth/password-email'], { queryParams: { email: this.lgUser.email } });
        // setTimeout(() => {
        //   this.emailSent = false;

        // }, 4000);
      }
    });
  }

  getUserByEmail(email) {
    this.authenticationService.getUserByEmail(email).subscribe(res => {
      if (res.success) {
        this.lgUser = res.user;
        this.submitted = false;
        if (this.lgUser.hasPassword) {
          this.showEmailForm = false;
          this.showPasswordForm = true;
        } else {
          this.showEmailForm = false;
          this.showquestionnaireForm = true;
        }
      } else {
        this.showEmailForm = true;
        this.showquestionnaireForm = false;
        if (res.message.includes('connect') || res.message.includes('fail')) {
          this.error = 'Can Not Login';
        } else {
          this.error = res.error || res.message;
        }
      }
    });
  }

  sendMessage() {
    this.disable['message'] = true;
    this.authenticationService.sendMessage(this.lgUser.email).subscribe(res => {
      this.messageSent = true;
      setTimeout(() => {
        this.messageSent = false;
        this.showOptions = false;
        this.showSmsConfirmationForm = true;
      }, 3000);
    });
  }

  onSmsConfirmationSubmit() {
    this.submitted = true;
    if (this.smsConfirmationForm.invalid) {
      return;
    }
    this.loading = true;
    this.authenticationService
      .confirmPasscode({
        email: this.lgUser.email,
        passcode: this.fSMS.passcode.value
      })
      .subscribe(res => {
        this.submitted = false;
        this.loading = false;
        this.error = '';
        if (res.success && res.user.valid) {
          this.showSmsConfirmationForm = false;
          this.route.navigate(['/set-password'], {
            queryParams: { token: res.user.token }
          });
        } else {
          this.error = 'Invalid passcode';
        }
      });
  }

  toQuestionnaire() {
    this.disable['question'] = true;
    this.showOptions = false;
    this.showquestionnaireForm = true;
  }

  backToSignIn() {
    this.showEmailForm = true;
    this.showPasswordForm = false;
    this.showOptions = false;
  }

  backToOptions() {
    this.showOptions = true;
    this.showquestionnaireForm = false;
    this.showSmsConfirmationForm = false;
    this.disable = {};
  }

  signInWithFB() {
    this.login = true;
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signInWithGoogle() {
    this.login = true;
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut() {
    this.authService.signOut();
  }

  navigateUser(role) {
    this.returnUrl = this.returnUrl ? this.returnUrl : `/${role.toLowerCase()}/home`;
    switch (role) {
      case Role.applicant:
        this.route.navigate([this.returnUrl]);
        break;
      case Role.employer:
        this.route.navigate([this.returnUrl]);
        break;
      case Role.admin:
        this.route.navigate([this.returnUrl]);
        break;
      case Role.staffer:
        this.route.navigate([this.returnUrl]);
        break;
      case Role.adminStaff:
        this.route.navigate([this.returnUrl]);
        break;
      default:
        this.route.navigate(['/']);
    }
  }
}
