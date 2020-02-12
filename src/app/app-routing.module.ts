import { CustomPreloadingService } from './_services/custom-preloading.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_helpers/auth.guard';
import { Role } from './_models/Role';

const routes: Routes = [
  {
    path: '',
    data: { preload: true },
    loadChildren: () => import('./landing/landing.module').then(mod => mod.LandingModule)
  },
  {
    path: 'auth',
    //canActivate: [AuthGuard],
    data: { preload: true },
    loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule)
  },
  {
    path: 'applicant',
    canActivate: [AuthGuard],
    data: { roles: [Role.applicant] },
    loadChildren: () => import('./applicant/applicant.module').then(mod => mod.ApplicantModule)
  },
  {
    path: 'staffer',
    canActivate: [AuthGuard],
    data: { roles: [Role.staffer] },
    loadChildren: () => import('./employer/employer.module').then(mod => mod.EmployerModule)
  },
  {
    path: 'employer',
    canActivate: [AuthGuard],
    data: { roles: [Role.employer] },
    loadChildren: () => import('./employer/employer.module').then(mod => mod.EmployerModule)
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    data: { roles: [Role.admin] },
    loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule)
  },
  {
    path: 'adminstaff',
    canActivate: [AuthGuard],
    data: { roles: [Role.adminStaff] },
    loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule)
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: CustomPreloadingService })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
