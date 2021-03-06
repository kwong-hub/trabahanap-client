import { HeaderComponent } from './components/header/header.component';
import { AuthRoutingModule } from './auth-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { AuthLoginComponent } from './components/auth-login/auth-login.component';
import { AuthenticationService } from '@app/_services/authentication-service.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AnonymousFooterComponent } from './components/anonymous-footer/anonymous-footer.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AuthRegisterComponent } from './components/auth-register/auth-register.component';
import { AnonymousCustomInputFieldComponent } from './components/anonymous-custom-input-field/anonymous-custom-input-field.component';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { AuthPasswordResetComponent } from './components/auth-password-reset/auth-password-reset.component';
import { AuthChangePasswordComponent } from './components/auth-change-password/auth-change-password.component';
import { AuthRegistrationSuccessComponent } from './components/auth-registration-success/auth-registration-success.component';
import { RegistrationService } from '@app/_services/registration.service';
import { AuthService } from 'angularx-social-login';
import {
  SocialLoginModule,
  AuthServiceConfig,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angularx-social-login';
import { CustomSubmitComponent } from './components/custom-submit/custom-submit.component';
import { PasswordEmailComponent } from './components/password-email/password-email.component';
import { CustomNotificationComponent } from './components/custom-notification/custom-notification.component';

// Google secrete YqcEI_IxCWPOPy5rgFOKcudM
const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('905512792025-1cbp5bu493v93o4aav8irigc37cptf8i.apps.googleusercontent.com')
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('964493183990975')
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AuthComponent,
    AuthLoginComponent,
    HeaderComponent,
    AnonymousFooterComponent,
    AuthRegisterComponent,
    AnonymousCustomInputFieldComponent,
    AuthPasswordResetComponent,
    AuthChangePasswordComponent,
    AuthRegistrationSuccessComponent,
    CustomSubmitComponent,
    PasswordEmailComponent,
    CustomNotificationComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    MatProgressBarModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    SocialLoginModule
  ],
  providers: [
    // AuthenticationService,
    RegistrationService,
    AuthService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ]
})
export class AuthModule {}
