import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-all-user-chats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-user-chats.component.html',
  styleUrl: './all-user-chats.component.scss',
})
export class AllUserChatsComponent {
  allUserDetail = [
    {
      imgURL: '',
      name: '',
    },
    {
      imgURL: '',
      name: '',
    },
    {
      imgURL: '',
      name: '',
    },
    {
      imgURL: '',
      name: '',
    },
    {
      imgURL: '',
      name: '',
    },
  ];

  public openUserChat(detail: any): void {}
}
