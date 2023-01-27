import { Component, EventEmitter, Input, Output } from '@angular/core';

import { UserEmailsService } from '../../user-emails.service';
import { UserIdsService } from 'src/app/user-ids.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css'],
})
export class MemberComponent {
  @Input() userEmail: string = '';
  @Input() userId: string = '';

  constructor(
    private userEmailsService: UserEmailsService,
    private userIdsService: UserIdsService
  ) {}

  removeElement() {
    this.userEmailsService.removeEmail(this.userEmail);
    this.userIdsService.removeId(this.userId);

    console.log('removed' + this.userEmail);
    console.log('removed' + this.userId);
  }
}
