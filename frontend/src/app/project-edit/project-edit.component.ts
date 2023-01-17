import { Component } from '@angular/core';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';
import { faTable } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css'],
})
export class ProjectEditComponent {
  userIcon = faCircleUser;
  tableIcon = faTable;
}
