import { Component, inject } from '@angular/core';
import { CommonService } from '../../service/common.service';
import { SafePipe } from '../../../shared/pipes/safe.pipe';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SafePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private common = inject(CommonService);
  public collapseSide = this.common.collapse;

  public collapse(): void {
    this.common.collapseSidebar();
  }
}
