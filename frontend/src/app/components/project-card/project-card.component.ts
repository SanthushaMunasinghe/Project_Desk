import { Component } from '@angular/core';

import { faPeopleArrows } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css'],
})
export class ProjectCardComponent {
  teamworkIcon = faPeopleArrows;
  projectTitle = 'Project Title';
}
