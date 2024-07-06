import { Component } from '@angular/core';
import { SafePipe } from '../../../../shared/pipes/safe.pipe';

@Component({
  selector: 'app-group-meet',
  standalone: true,
  imports: [SafePipe],
  templateUrl: './group-meet.component.html',
  styleUrl: './group-meet.component.scss',
})
export class GroupMeetComponent {
  isAudio: boolean = true;
  isVideo: boolean = true;

  public muteAudio(): void {
    this.isAudio = !this.isAudio;
    // if (!this.isAudio) {
    //   this.localStream.disableAudio();
    // } else {
    //   this.localStream.enableAudio();
    // }
  }

  public muteVideo(): void {
    this.isVideo = !this.isVideo;
    // if (!this.isVideo) {
    //   this.localStream.disableVideo();
    // } else {
    //   this.localStream.enableVideo();
    // }
  }
}
