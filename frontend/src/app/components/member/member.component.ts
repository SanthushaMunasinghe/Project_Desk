import { Component, EventEmitter, Input, Output } from '@angular/core';

import { UserEmailsService } from '../../user-emails.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css'],
})
export class MemberComponent {
  @Input() userEmail: string = '';

  constructor(private userEmailsService: UserEmailsService) {}

  removeElement() {
    this.userEmailsService.removeEmail(this.userEmail);
    console.log('removed' + this.userEmail);
  }
}
