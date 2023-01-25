import { Component, Input } from '@angular/core';

import { faCircleUser } from '@fortawesome/free-regular-svg-icons';
import { faTable } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css'],
})
export class UserNavbarComponent {
  userIcon = faCircleUser;
  tableIcon = faTable;

  @Input() headingTxt: string = '';

  @Input() emailTxt: string = '';

  @Input() id: string = '';

  @Input() btnTxt: string = '';
}
