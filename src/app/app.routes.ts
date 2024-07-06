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
  {
    path: 'products',
    loadComponent: () =>
      import('./feature/components/products/all-products/all-products.component').then(
        (m) => m.AllProductsComponent
      ),
    canMatch: [authGuard],
  },
  {
    path: 'quiz',
    loadComponent: () =>
      import('./feature/components/exam/questions/questions.component').then(
        (m) => m.QuestionsComponent
      ),
    canMatch: [authGuard],
  },
  {
    path: 'meet',
    loadComponent: () =>
      import('./feature/components/apiRTC/create-meet/create-meet.component').then(
        (m) => m.CreateMeetComponent
      ),
    canMatch: [authGuard],
  },
  {
    path: 'meet/:id',
    loadComponent: () =>
      import('./feature/components/apiRTC/group-meet/group-meet.component').then(
        (m) => m.GroupMeetComponent
      ),
    canMatch: [authGuard],
  },
  {
    path: 'images',
    loadComponent: () =>
      import('./feature/components/images/images.component').then(
        (m) => m.ImagesComponent
      ),
    canMatch: [authGuard],
  },
];
