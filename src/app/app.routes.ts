import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./feature/components/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: 'maps',
    loadComponent: () =>
      import('./feature/components/google-map/google-map.component').then(
        (m) => m.GoogleMapComponent
      ),
  },
];
