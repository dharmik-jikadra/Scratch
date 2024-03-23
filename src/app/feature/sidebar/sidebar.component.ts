import { Component } from '@angular/core';
import { SafePipe } from '../../shared/pipes/safe.pipe';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SafePipe],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  public sidebarMenus = [
    {
      label: 'Dashboard',
      url: '',
      icon: 'dashboard',
    },
    {
      label: 'Map',
      url: '',
      icon: 'location',
    },
    {
      label: 'Charts',
      url: '',
      icon: 'home',
    },
    {
      label: 'Users Page',
      url: '',
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
