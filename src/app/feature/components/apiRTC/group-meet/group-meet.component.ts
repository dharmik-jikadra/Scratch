import { Component, ElementRef, ViewChild } from '@angular/core';
import { SafePipe } from '../../../../shared/pipes/safe.pipe';
import apiRTC, {
  UserAgent,
  Session,
  Stream,
  Conversation,
} from '@apirtc/apirtc';

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
  @ViewChild('localVideo') videoRef!: ElementRef;
  userAgent!: UserAgent;
  conversation!: Conversation;
  conversationName = 'my-new-conversation';
  remotesCounter = 0;
  localStream: any;

  ngOnInit() {
    this.joinConversation();
  }

  joinConversation() {
    //==============================
    // 1. CREATE USER AGENT
    //==============================
    this.userAgent = new apiRTC.UserAgent({
      uri: 'apzkey:myDemoApiKey',
    });

    //==============================
    // 2. REGISTER
    //==============================
    this.userAgent.register().then((session: Session) => {
      //==============================
      // 3/ CREATE CONVERSATION
      //==============================
      this.conversation = session.getConversation(this.conversationName);

      //==========================================================
      // 4/ ADD EVENT LISTENER : WHEN NEW STREAM IS AVAILABLE IN CONVERSATION
      //==========================================================
      this.conversation.on('streamListChanged', (streamInfo: any) => {
        if (streamInfo.listEventType === 'added') {
          if (streamInfo.isRemote === true) {
            this.conversation
              .subscribeToMedia(streamInfo.streamId)
              .then((stream: Stream) => {
                console.log('subscribeToMedia success', stream);
              })
              .catch((err: any) => {
                console.error('subscribeToMedia error', err);
              });
          }
        }
      });

      //=====================================================
      // 4 BIS/ ADD EVENT LISTENER : WHEN STREAM IS ADDED/REMOVED TO/FROM THE CONVERSATION
      //=====================================================
      this.conversation
        .on('streamAdded', (stream: Stream) => {
          console.log('stream ====>', stream);
          this.remotesCounter += 1;
          stream.addInDiv(
            'remote-container',
            'remote-media-' + stream.streamId,
            {},
            false
          );
        })
        .on('streamRemoved', (stream: any) => {
          this.remotesCounter -= 1;
          stream.removeFromDiv(
            'remote-container',
            'remote-media-' + stream.streamId
          );
        });

      //==============================
      // 5. CREATE LOCAL STREAM
      //==============================
      this.userAgent
        .createStream({
          constraints: {
            video: true,
            audio: true,
          },
        })
        .then((stream: Stream) => {
          console.log('createStream :', stream);

          // Save local stream
          this.localStream = stream;
        });

      //==============================
      // 6. JOIN CONVERSATION
      //==============================
      this.conversation
        .join()
        .then(() => {
          //==============================
          // 7. PUBLISH LOCAL STREAM
          //==============================
          this.conversation
            .publish(this.localStream)
            .then((stream: Stream) => {
              console.log('published', stream);
            })
            .catch((err: any) => {
              console.error('publish error', err);
            });
        })
        .catch((err: any) => {
          console.error('Conversation join error', err);
        });
    });
  }

  leaveConversation() {
    this.conversation
      .leave()
      .then(() => {
        console.debug('Conversation leave OK');
      })
      .catch((err: any) => {
        console.error('Conversation leave error', err);
      });
    this.conversation.destroy();
    window.location.reload();
  }

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
