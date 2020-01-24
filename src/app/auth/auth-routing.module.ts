import { AuthRegistrationSuccessComponent } from "./components/auth-registration-success/auth-registration-success.component";
import { AuthChangePasswordComponent } from "./components/auth-change-password/auth-change-password.component";
import { AuthPasswordResetComponent } from "./components/auth-password-reset/auth-password-reset.component";
import { AuthRegisterComponent } from "./components/auth-register/auth-register.component";
import { AuthLoginComponent } from "./components/auth-login/auth-login.component";
import { AuthComponent } from "./auth.component";
import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

const routes: Routes = [
  {
    path: "",
    component: AuthComponent,
    children: [
      // { path: '', redirectTo: 'home', pathMatch: 'full'},
      // { path: 'home', component: HomeComponent},
      { path: "login", component: AuthLoginComponent },
      { path: "set-password", component: AuthChangePasswordComponent },
      { path: "register", component: AuthRegisterComponent },
      { path: "forgot-password", component: AuthPasswordResetComponent },
      { path: "register/success", component: AuthRegistrationSuccessComponent }
      // { path: 'featured/jobs', component:FeatureJobListComponent,resolve:{data:SimpleJobSearchResolveService} }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
