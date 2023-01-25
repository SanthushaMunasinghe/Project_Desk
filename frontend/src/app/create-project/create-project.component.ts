import { Component } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { faCircleUser } from '@fortawesome/free-regular-svg-icons';

interface UserResponse {
  user: any;
  email: string;
}

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css'],
})
export class CreateProjectComponent {
  userEmail: string = '';
  userId: string = '';

  userIcon = faCircleUser;

  loginForm = this.formBuilder.group({
    title: '',
    description: '',
  });

  submitErrors: string[] = [''];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
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
  }
}
