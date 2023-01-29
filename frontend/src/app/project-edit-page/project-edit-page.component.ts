import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { faTable } from '@fortawesome/free-solid-svg-icons';

interface Task {
  _id: string;
  title: string;
  description: string;
  file: string;
  status: string;
  projectId: string;
}

interface UserResponse {
  user: any;
  email: string;
}

interface ProjectResponse {
  id: string;
  title: string;
}

@Component({
  selector: 'app-project-edit-page',
  templateUrl: './project-edit-page.component.html',
  styleUrls: ['./project-edit-page.component.css'],
})
export class ProjectEditPageComponent {
  tableIcon = faTable;

  userEmail: string = '';
  userId: string = '';

  projectTitle: string = '';
  projectId: string = '';

  projectTasks: Task[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');
    this.userId = userId != null ? userId : this.userId;
    this.http.get<UserResponse>(`/api/users/${userId}`).subscribe(
      (res) => {
        console.log(res);
        this.userEmail = res.email;
      },
      (error) => {
        console.log(error);
      }
    );

    const projectId = this.route.snapshot.paramMap.get('projectid');
    this.projectId = projectId != null ? projectId : this.projectId;
    this.http.get<ProjectResponse>(`/api/project/${projectId}`).subscribe(
      (res) => {
        console.log(res);
        this.projectTitle = res.title;
        this.projectId = res.id;
      },
      (error) => {
        console.log(error);
      }
    );

    this.http.get<Task[]>(`/api/tasks/${projectId}`).subscribe(
      (response) => {
        this.projectTasks = response;
        console.log(this.projectTasks);
      },
      (error) => {
        console.log(error.error);
      }
    );
  }
}
