import { Component } from '@angular/core';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css'],
})
export class CreateProjectComponent {
  emailTxt: string = 'santhusha@gmail.com';
  userIcon = faCircleUser;
}
