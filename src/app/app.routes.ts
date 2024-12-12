import { NavbarComponent } from './core/pages/navbar/navbar.component';
import { WelcomePageComponent } from './core/pages/welcome-page/welcome-page.component';
import { VerifyCodeComponent } from './core/pages/verify-code/verify-code.component';
import { ForgetPassComponent } from './core/pages/forget-pass/forget-pass.component';
import { LoginComponent } from './core/pages/login/login.component';
import { Routes } from '@angular/router';
import { RegisterComponent } from './core/pages/register/register.component';

export const routes: Routes = [
  {
    
    path: '',
    loadComponent: () =>
      import('./core/pages/navbar/navbar.component').then(
        (c) => c.NavbarComponent
      ),
  },

  {
    path: 'welcome',
    loadComponent: () =>
      import('./core/pages/welcome-page/welcome-page.component').then(
        (c) => c.WelcomePageComponent
      ),
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./core/pages/login/login.component').then(
            (c) => c.LoginComponent
          ),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./core/pages/register/register.component').then(
            (c) => c.RegisterComponent
          ),
      },
      {
        path: 'forget_pass',
        loadComponent: () =>
          import('./core/pages/forget-pass/forget-pass.component').then(
            (c) => c.ForgetPassComponent
          ),
      },
      {
        path: 'verify_code',
        loadComponent: () =>
          import('./core/pages/verify-code/verify-code.component').then(
            (c) => c.VerifyCodeComponent
          ),
      },
      {
        path: 'setpass',
        loadComponent: () =>
          import('./core/pages/set-pass/set-pass.component').then(
            (c) => c.SetPassComponent
          ),
      },
    ],
  },
];
