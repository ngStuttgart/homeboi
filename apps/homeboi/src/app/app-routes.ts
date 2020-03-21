import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  {
    path: 'company',
    loadChildren: () =>
      import('./company/company.module').then(m => m.CompanyModule)
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];