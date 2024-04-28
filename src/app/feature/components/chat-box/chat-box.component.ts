import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-chat-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-box.component.html',
  styleUrl: './chat-box.component.scss',
})
export class ChatBoxComponent {
  allMessages = [
    {
      msg: 'This my Message',
      sender: true,
      time: '16:20',
    },
    {
      msg: 'This my Message',
      sender: false,
      time: '18:20',
    },
    {
      msg: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat officiis tenetur deleniti porro nemo molestias veritatis eum, suscipit reprehenderit vero non quae earum saepe accusantium ad vitae! Ipsa perspiciatis porro deserunt quae repellat minus alias consequuntur hic sapiente quaerat iste cumque odit error libero sequi nesciunt sed consectetur at dolorem eum consequatur, rem ex. Architecto esse voluptate tempore, itaque commodi ea nihil at vel, consectetur totam numquam? Harum repudiandae sit quam impedit asperiores, iste consectetur maxime cum, ut et accusamus eligendi sed inventore dolores quis, consequuntur atque temporibus ad voluptates! Enim, iste molestias cumque eos pariatur blanditiis ad tenetur velit.',
      sender: true,
      time: '20:20',
    },
    {
      msg: 'This my Message',
      sender: false,
      time: '16:20',
    },
    {
      msg: 'This my Message',
      sender: true,
      time: '16:20',
    },
    {
      msg: 'This my Message',
      sender: false,
      time: '21:20',
    },
    {
      msg: 'This my Message',
      sender: true,
      time: '16:20',
    },
    {
      msg: 'This my Message',
      sender: false,
      time: '08:20',
    },
    {
      msg: 'This my Message',
      sender: false,
      time: '06:20',
    },
    {
      msg: 'This my Message',
      sender: true,
      time: '16:20',
    },
    {
      msg: 'This my Message',
      sender: false,
      time: '03:20',
    },
    {
      msg: 'This my Message',
      sender: true,
      time: '04:20',
    },
  ];
  public sendChat(msg: string): void {}
}
