import { Component } from '@angular/core';

import {
  faBriefcase,
  faPeopleArrows,
  faComment,
  faCheck,
  faBars,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent {
  briefCaseIcon = faBriefcase;
  teamworkIcon = faPeopleArrows;
  messageIcon = faComment;
  checkIcon = faCheck;
  burgurIcon = faBars;
}
