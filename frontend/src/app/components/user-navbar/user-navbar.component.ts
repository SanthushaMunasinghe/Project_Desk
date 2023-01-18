import { Component } from '@angular/core';

import { faCircleUser } from '@fortawesome/free-regular-svg-icons';

const userEmail = 'santhusha@gmail.com';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css'],
})
export class UserNavbarComponent {
  userIcon = faCircleUser;
  emailTxt: string = userEmail;
}
