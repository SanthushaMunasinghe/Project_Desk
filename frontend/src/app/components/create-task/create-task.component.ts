import { Component, Input } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css'],
})
export class CreateTaskComponent {
  @Input() projectId: string = '';

  addTaskForm = this.formBuilder.group({
    title: '',
    description: '',
  });

  submitErrors: string[] = [''];
  submitSuccess: string = '';

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  onSubmit(): void {
    this.submitErrors = [];
    this.submitSuccess = '';

    if (!this.addTaskForm.value.title || !this.addTaskForm.value.description) {
      this.submitErrors.push('Fill All Fields');
    }

    if (this.submitErrors.length == 0) {
      const task = {
        title: this.addTaskForm.value.title,
        description: this.addTaskForm.value.description,
        file: '',
        status: 'In Progress',
        projectId: this.projectId,
      };

      // Check if task title already exists
      this.http.post('/api/task', task).subscribe(
        (response) => {
          console.log(response);
          this.submitSuccess = 'Success!';
          this.addTaskForm.reset();
          location.reload();
        },
        (error) => {
          this.submitErrors.push(error.error.error);
        }
      );
    }
  }
}
