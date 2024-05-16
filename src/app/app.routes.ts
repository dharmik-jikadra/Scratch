import { Routes } from '@angular/router';
import { autoLoginGuard } from './core/guards/auto-login.guard';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./feature/components/login/login.component').then(
        (m) => m.LoginComponent
      ),
    canMatch: [autoLoginGuard],
  },
  {
    path: 'sign-up',
    loadComponent: () =>
      import('./feature/components/sign-up/sign-up.component').then(
        (m) => m.SignUpComponent
      ),
  },
  // {
  //   path: '',
  //   redirectTo: 'dashboard',
  //   pathMatch: 'full',
  // },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./feature/components/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
    canMatch: [authGuard],
  },
  {
    path: 'maps',
    loadComponent: () =>
      import('./feature/components/google-map/google-map.component').then(
        (m) => m.GoogleMapComponent
      ),
    canMatch: [authGuard],
  },
  {
    path: 'chats',
    loadComponent: () =>
      import('./feature/components/chat-layout/chat-layout.component').then(
        (m) => m.ChatLayoutComponent
      ),
    canMatch: [authGuard],
  },
];
