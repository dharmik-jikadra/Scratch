import { Component, inject } from '@angular/core';
import { AllUserChatsComponent } from '../all-user-chats/all-user-chats.component';
import { ChatBoxComponent } from '../chat-box/chat-box.component';
import { BreadcrumbService } from '../../../shared/services/breadcrumb.service';

@Component({
  selector: 'app-chat-layout',
  standalone: true,
  imports: [AllUserChatsComponent, ChatBoxComponent],
  templateUrl: './chat-layout.component.html',
  styleUrl: './chat-layout.component.scss',
})
export class ChatLayoutComponent {
  private breadCrumb = inject(BreadcrumbService);

  constructor() {
    this.breadCrumb.setBreadcrumbs([
      { label: 'Home', url: '/dashboard' },
      { label: 'Chats', url: '/chats' },
    ]);
  }
}
