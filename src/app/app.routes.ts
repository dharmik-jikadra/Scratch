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
];
