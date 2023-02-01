import { Component, Input } from '@angular/core';

import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';

import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent {
  sendIcon = faPaperPlane;

  sendMessageForm = this.formBuilder.group({
    message: '',
  });

  @Input() projectTitle: string = '';
  @Input() userId: string = '';
  @Input() projectId: string = '';

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  sendMessage() {
    const message = {
      projectId: this.projectId,
      message: this.sendMessageForm.value.message,
      userId: this.userId,
    };

    console.log(message);

    this.http.post('/api/message', message).subscribe(
      (response) => {
        console.log(response);
        this.sendMessageForm.reset();
        location.reload();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
