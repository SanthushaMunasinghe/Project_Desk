import { Component, Input } from '@angular/core';

import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { WebsocketService } from 'src/app/websocket.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent {
  sendIcon = faPaperPlane;

  @Input() userId: string = '';
  @Input() projectId: string = '';

  constructor(private webSocketService: WebsocketService) {}

  ngOnInit() {
    this.webSocketService.listen('test event').subscribe((data) => {
      console.log(data);
    });
  }

  sendMessage() {
    // this.socket.emit('sendMessage', { message, userId });
  }
}
