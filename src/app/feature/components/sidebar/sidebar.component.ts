import { Component, effect, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SafePipe } from '../../../shared/pipes/safe.pipe';
import { CommonService } from '../../service/common.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, SafePipe, TranslateModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  animations: [
    trigger('slideInOut', [
      state('open', style({ width: '280px' })),
      state('closed', style({ width: '100px' })),
      transition('open <=> closed', [animate('300ms ease-in-out')]),
    ]),
  ],
})
export class SidebarComponent {
  private commmon = inject(CommonService);
  private translate = inject(TranslateService);
  private router = inject(Router);
  private auth = inject(AuthService);

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
      label: 'Chats',
      url: 'chats',
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
  navCollapse = this.commmon.collapse;

  constructor() {
    // effect(() => {
    //   console.log('this.commmon.collapse()', this.commmon.collapse());
    //   this.navCollapse = this.commmon.collapse()
    // });
  }

  public logout(): void {
    this.auth.logout();
    this.router.navigate(['login']);
  }
}
