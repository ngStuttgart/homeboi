import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './guards/auth.guard';
import { PublicGuard } from './guards/public.guard';

export const APP_ROUTES: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [PublicGuard]
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [PublicGuard]
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'company',
    loadChildren: () =>
      import('./company/company.module').then(m => m.CompanyModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'notifications',
    loadChildren: () => import('./notifications/notifications.module').then(m => m.NotificationsModule)
  },
  {
    path: 'inserat-details',
    loadChildren: () => import('./inserat-details/inserat-details.module').then(m => m.InseratDetailsModule)
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
