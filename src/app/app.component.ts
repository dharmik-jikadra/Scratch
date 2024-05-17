import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './feature/components/header/header.component';
import { SidebarComponent } from './feature/components/sidebar/sidebar.component';
import { AuthService } from './feature/service/auth.service';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SidebarComponent,
    HeaderComponent,
    TranslateModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private authService = inject(AuthService);
  private translateService = inject(TranslateService);
  public isAuthenticate = this.authService.isAutheticate;

  constructor() {
    this.translateService.setDefaultLang(
      localStorage.getItem('language') || 'en-US'
    );
  }
}
