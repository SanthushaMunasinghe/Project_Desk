import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { faTable } from '@fortawesome/free-solid-svg-icons';

interface Project {
  title: string;
  description: string;
  memberCount: string;
}

interface UserResponse {
  user: any;
  email: string;
}

const DUMMY_ProjectS: Project[] = [
  {
    title: 'Title 1',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, a.',
    memberCount: '5',
  },
  {
    title: 'Title 2',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, a.',
    memberCount: '4',
  },
  {
    title: 'Title 1',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, a.',
    memberCount: '10',
  },
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  tableIcon = faTable;
  projects: Project[] = DUMMY_ProjectS;
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
  }
}
