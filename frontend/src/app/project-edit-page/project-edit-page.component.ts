import { Component } from '@angular/core';

import { faTable } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-project-edit-page',
  templateUrl: './project-edit-page.component.html',
  styleUrls: ['./project-edit-page.component.css'],
})
export class ProjectEditPageComponent {
  tableIcon = faTable;
}
