import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { faTable } from '@fortawesome/free-solid-svg-icons';

interface Project {
  _id: string;
  title: string;
  description: string;
  admin: string;
  members: [];
}

interface UserResponse {
  user: any;
  email: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  tableIcon = faTable;
  myProjects: Project[] = [];
  invitedProjects: Project[] = [];
  userEmail: string = '';
  userId: string = '';

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

    this.http.get<Project[]>(`/api/projects/admin/${userId}`).subscribe(
      (response) => {
        this.myProjects = response;
        console.log(this.myProjects);
      },
      (error) => {
        console.log(error.error);
      }
    );

    this.http.get<any>(`/api/projects/${userId}`).subscribe(
      (response) => {
        this.invitedProjects = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
