import { Routes } from '@angular/router';
import { AuthGuard } from './pages/components/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./pages/components/auth/signup/signup.component').then((m) => m.SignupComponent)
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/components/auth/login/login.component').then((m) => m.LoginComponent)
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/components/home/home.component').then( m => m.HomeComponent),
    canActivate: [AuthGuard]
  },
];
