import { Component } from '@angular/core';

import { faTable } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css'],
})
export class ProjectPageComponent {
  tableIcon = faTable;
}
