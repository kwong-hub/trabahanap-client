import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SocialUser } from 'angularx-social-login';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from '@app/_services/authentication-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-shared-login-temp',
  templateUrl: './shared-login-temp.component.html',
  styleUrls: ['./shared-login-temp.component.scss']
})
export class SharedLoginTempComponent implements OnInit {

  emailForm: FormGroup;
  passwordForm: FormGroup;
  questionaryForm: FormGroup;
  smsConfirmationForm: FormGroup;
  showEmailForm = true;
  showPasswordForm = false;
  showQuestionaryForm = false;
  showSmsConfirmationForm = false;
  showOptions = false;
  loading = false;
  submitted = false;
  homeUrl: string;
  error = '';
  registerType = "applicant"; // who is to be registered: Employer or Applicant; default Applicant
  registerSuccess: boolean;
  returnUrl: any;
  user: SocialUser;
  lgUser: any;
  loggedIn: boolean;
  eyeIcon = faEyeSlash;
  passwordType: string = "password";

  login = false;
  socialError = "";
  emailSent = false;
  messageSent = false;

  disable: any;

  constructor(
    private formBuilder: FormBuilder, 
    private authenticationService: AuthenticationService, 
    private route: Router, 
    private router: ActivatedRoute
  ) {
    if (this.authenticationService.currentUserValue) { 
      this.route.navigate([`/${this.authenticationService.currentUserValue.role.toLowerCase()}`]);
    }
   }

  ngOnInit() {
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
    this.passwordForm = this.formBuilder.group({
      password: ['', Validators.required]
    });
    this.questionaryForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['']
    });
    this.smsConfirmationForm = this.formBuilder.group({
      passcode: ['', Validators.required],
    });
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

  get f() { return this.emailForm.controls; }

  get fPassword() { return this.passwordForm.controls; }

  get fQuestionary() { return this.questionaryForm.controls; }

  get fSMS() { return this.smsConfirmationForm.controls; }

  onEmailSubmit() {
    this.submitted = true;
    if (this.emailForm.invalid) {
      return;
    }
    this.loading = true;

    this.authenticationService.getUserByEmail(this.f.email.value)
      .subscribe(
        res => {
          // console.log(res);
          this.loading = false;
          this.error = "";
          if(res.success){
            this.lgUser = res.user;
            this.submitted = false;
            if(this.lgUser.hasPassword){
              this.showEmailForm = false;
              this.showPasswordForm = true;
            }else{
              this.showEmailForm = false;
              this.showOptions = true;
            }
          }else{
            this.error = res.error || res.message;
          }
        }
      )
  }
  
  onPasswordSubmit(){
    this.submitted = true;
    if (this.fPassword.invalid) {
      return;
    }
    this.loading = true;

    // console.log(this.lgUser.email, this.fPassword.password.value);
    this.authenticationService.login(this.lgUser.email, this.fPassword.password.value)
    .pipe(first())
    .subscribe(
        data => {
          // console.log(data)
          if(data.success){
            this.returnUrl = this.router.snapshot.queryParams['returnUrl'] || `/${data.user.role.toLowerCase()}`;
            this.route.navigate([this.returnUrl]);
          }else {
            this.error = data.error;
            this.loading = false;
          }
        },
        err => {
          this.loading = false;
          console.log(err);
        }
    )
  }

  onQuestionarySubmit(){
    this.submitted = true;
    if (this.questionaryForm.invalid) {
      return;
    }
    this.loading = true;

    this.authenticationService.checkValidUser({
      email: this.lgUser.email, 
      firstName: this.fQuestionary.firstName.value,
      lastName: this.fQuestionary.lastName.value,
      phoneNumber: this.fQuestionary.phoneNumber.value  
    })
    .subscribe(
      res => {
        this.loading = false;
        this.error = "";
        if(res.success && res.user.valid){
          this.submitted = false;
          this.showQuestionaryForm = false;
          this.route.navigate(['/set-password'], { queryParams: { token: res.user.token} });
        }else{
          this.error = "Invalid information try again.";
        }
      }
    )
  }

  sendEmail(){
    this.disable['email'] = true;
    this.authenticationService.resetPassword(this.lgUser.email)
    .subscribe(
      res => {
        if(res.success){
          this.emailSent = true;
          setTimeout(() => {
            this.emailSent = false;
            this.route.navigate(['/']);
          }, 4000)
        }
      }
    )
    // console.log(this.lgUser);
  }

  sendMessage(){
    this.disable['message'] = true;
    this.authenticationService.sendMessage(this.lgUser.email)
      .subscribe(
        res => {
          this.messageSent = true;
          setTimeout(() => {
            this.messageSent = false;
            this.showOptions = false;
            this.showSmsConfirmationForm = true;
          }, 3000)
        }
      )
  }

  onSmsConfirmationSubmit(){
    this.submitted = true;
    if (this.smsConfirmationForm.invalid) {
      return;
    }
    this.loading = true;
    this.authenticationService.confirmPasscode({
      email: this.lgUser.email,
      passcode: this.fSMS.passcode.value,
    })
    .subscribe(
      res => {
        this.submitted = false;
        this.loading = false;
        this.error = "";
        if(res.success && res.user.valid){
          this.showSmsConfirmationForm = false;
          this.route.navigate(['/set-password'], { queryParams: { token: res.user.token} });
        }else{
          this.error = "Invalid passcode";
        }
      }
    )
  }

  toQuestionary(){
    this.disable['question'] = true;
    this.showOptions = false;
    this.showQuestionaryForm = true;
  }
}
