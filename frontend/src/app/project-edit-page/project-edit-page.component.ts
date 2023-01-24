import { Component } from '@angular/core';

import { faTable } from '@fortawesome/free-solid-svg-icons';

interface Task {
  task_title: string;
  task_description: string;
  task_status: string;
}

const DUMMY_TASKS: Task[] = [
  {
    task_title: 'Task 1 Title',
    task_description: 'Task 1 Description',
    task_status: 'In Progress',
  },
  {
    task_title: 'Task 2 Title',
    task_description: 'Task 2 Description',
    task_status: 'Done',
  },
  {
    task_title: 'Task 3 Title',
    task_description: 'Task 3 Description',
    task_status: 'In Progress',
  },
];

@Component({
  selector: 'app-project-edit-page',
  templateUrl: './project-edit-page.component.html',
  styleUrls: ['./project-edit-page.component.css'],
})
export class ProjectEditPageComponent {
  tableIcon = faTable;

  userEmail: string = 'santhusha@gmail.com';
  projectTitle: string = 'Title1';

  projectTasks: Task[] = DUMMY_TASKS;
}
