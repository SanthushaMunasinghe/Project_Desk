import { Component } from '@angular/core';

import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent {
  sendIcon = faPaperPlane;
}
