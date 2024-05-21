import { Component, inject } from '@angular/core';
import { CommonService } from '../../service/common.service';
import { SafePipe } from '../../../shared/pipes/safe.pipe';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SafePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private common = inject(CommonService);
  private translateService = inject(TranslateService);
  public collapseSide = this.common.collapse;

  public language = localStorage.getItem('language');
  public languageList = [
    {
      label: 'English',
      value: 'en-US',
    },
    {
      label: 'Russian',
      value: 'rs-RUS',
    },
  ];

  public collapse(): void {
    this.common.collapseSidebar();
  }

  public selectLanguage(event: any): void {
    const val = event.target?.value;
    localStorage.setItem('language', val);
    this.translateService.use(val);
  }
}
