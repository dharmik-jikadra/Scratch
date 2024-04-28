import { Component } from '@angular/core';
import { AllUserChatsComponent } from '../all-user-chats/all-user-chats.component';
import { ChatBoxComponent } from '../chat-box/chat-box.component';

@Component({
  selector: 'app-chat-layout',
  standalone: true,
  imports: [AllUserChatsComponent, ChatBoxComponent],
  templateUrl: './chat-layout.component.html',
  styleUrl: './chat-layout.component.scss',
})
export class ChatLayoutComponent {}
