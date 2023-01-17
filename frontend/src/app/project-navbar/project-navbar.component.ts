import { Component } from '@angular/core';

import { faTable } from '@fortawesome/free-solid-svg-icons';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-project-navbar',
  templateUrl: './project-navbar.component.html',
  styleUrls: ['./project-navbar.component.css'],
})
export class ProjectNavbarComponent {
  tableIcon = faTable;
  userIcon = faCircleUser;
}
