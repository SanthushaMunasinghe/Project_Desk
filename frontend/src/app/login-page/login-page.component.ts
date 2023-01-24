import { Component } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface UserResponse {
  user: any;
  userId: string;
}

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  signupForm = this.formBuilder.group({
    email: '',
    password: '',
  });

  signupErrors: string[] = [''];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {}

  onSubmit(): void {
    const formUser = this.signupForm.value;
    this.signupErrors = [];

    if (!formUser.email && !formUser.password) {
      this.signupErrors.push('Please fill all the fields!');
    }

    if (this.signupErrors.length == 0) {
      const login = { email: formUser.email, password: formUser.password };
      this.http.post<UserResponse>('/api/login', login).subscribe(
        (res) => {
          console.log(res);
          this.signupForm.reset();
          this.router.navigate(['/dashboard', res.userId]);
        },
        (error) => {
          this.signupErrors.push(error.error.message);
        }
      );
    }
  }
}
