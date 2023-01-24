import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-project-task-edit',
  templateUrl: './project-task-edit.component.html',
  styleUrls: ['./project-task-edit.component.css'],
})
export class ProjectTaskEditComponent {
  @Input() taskIndex: string = '';
  @Input() taskTitle: string = '';
  @Input() taskDescription: string = '';
}
