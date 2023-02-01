import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { faTable } from '@fortawesome/free-solid-svg-icons';
import { MessagesService } from '../messages.service';

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
  admin: string;
}

interface ChatResponse {
  projectId: string;
  chats: object[];
}

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css'],
})
export class ProjectPageComponent {
  tableIcon = faTable;

  userId: string = '';
  userEmail: string = '';
  projectTitle: string = '';
  projectId: string = '';
  projectAdmin: string = '';

  navLink: string = '';
  navTxt: string = '';

  projectTasks: Task[] = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    public messageService: MessagesService
  ) {}

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
        this.projectAdmin = res.admin;

        if (this.projectAdmin == this.userId) {
          this.navLink = '/edit';
          this.navTxt = 'Edit';
        } else {
          this.navLink = '/project';
          this.navTxt = '-';
        }
      },
      (error) => {
        console.log(error);
      }
    );

    this.http.get<Task[]>(`/api/tasks/${projectId}`).subscribe(
      (response) => {
        this.projectTasks = response;
        // console.log(this.projectTasks);
      },
      (error) => {
        console.log(error.error);
      }
    );

    // this.messageService.clearMessages();

    this.http.get(`/api/message/${projectId}`).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
