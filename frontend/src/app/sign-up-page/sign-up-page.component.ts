import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface UserResponse {
  user: any;
  userId: string;
}

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css'],
})
export class SignUpPageComponent {
  signupForm = this.formBuilder.group({
    email: '',
    password: '',
    passwordConfirmed: '',
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

    if (formUser.email && formUser.password && formUser.passwordConfirmed) {
      if (formUser.password.length > 16 || formUser.password.length < 8) {
        this.signupErrors.push('Password must have 8-16 characters');
      } else if (formUser.password != formUser.passwordConfirmed) {
        this.signupErrors.push('Password does not match!');
      }
    } else {
      this.signupErrors.push('Please fill all the fields!');
    }

    if (this.signupErrors.length == 0) {
      const user = { email: formUser.email, password: formUser.password };
      this.http.post<UserResponse>('/api/users', user).subscribe(
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
