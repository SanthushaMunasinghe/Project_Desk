import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-project-task-edit',
  templateUrl: './project-task-edit.component.html',
  styleUrls: ['./project-task-edit.component.css'],
})
export class ProjectTaskEditComponent {
  @Input() taskIndex: number = 0;
  @Input() taskId: string = '';

  @Input() taskTitle: string = '';
  @Input() taskDescription: string = '';

  message: string = '';

  constructor(private http: HttpClient) {}

  deleteProject() {
    this.http.delete(`/api/tasks/${this.taskId}`).subscribe(
      (response) => {
        console.log(response);
        location.reload();
      },
      (error) => {
        console.log(error.error);
      }
    );
  }

  completeProject() {
    this.http.put(`/api/task/${this.taskId}`, { status: 'Complete' }).subscribe(
      (res) => {
        console.log(res);
        this.message = 'Success!';
      },
      (err) => {
        console.log(err);
        this.message = 'Error';
      }
    );
  }
}
