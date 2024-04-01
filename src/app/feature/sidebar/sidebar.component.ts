import { Component } from '@angular/core';
import { SafePipe } from '../../shared/pipes/safe.pipe';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule,SafePipe],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  public sidebarMenus = [
    {
      label: 'Dashboard',
      url: 'dashboard',
      icon: 'dashboard',
    },
    {
      label: 'Map',
      url: 'maps',
      icon: 'location',
    },
    {
      label: 'Charts',
      url: 'charts',
      icon: 'home',
    },
    {
      label: 'Users Page',
      url: 'users',
      icon: 'multiple',
      subMenu: [
        {
          label: 'Error Page',
          url: '',
          icon: '',
        },
        {
          label: 'Login',
          url: '',
          icon: '',
        },
        {
          label: 'Register',
          url: '',
          icon: '',
        },
      ],
    },
  ];
}
