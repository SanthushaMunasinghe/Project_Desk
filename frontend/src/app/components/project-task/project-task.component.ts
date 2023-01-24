import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-project-task',
  templateUrl: './project-task.component.html',
  styleUrls: ['./project-task.component.css'],
})
export class ProjectTaskComponent {
  @Input() taskIndex: string = '';
  @Input() taskTitle: string = '';
  @Input() taskDescription: string = '';
  @Input() taskStatus: string = '';
}
