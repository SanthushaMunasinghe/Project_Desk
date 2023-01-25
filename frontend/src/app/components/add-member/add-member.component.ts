import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface UserResponse {
  user: any;
  email: string;
}

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css'],
})
export class AddMemberComponent {
  @Input() myEmail: string = '';

  addEmailForm = this.formBuilder.group({
    email: '',
  });

  userEmails: string[] = [];

  findErrors: string[] = [''];

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  onSubmit(): void {
    this.findErrors = [];

    if (!this.addEmailForm.value.email) {
      this.findErrors.push('Enter an email');
    }

    if (this.findErrors.length == 0) {
      const email = this.addEmailForm.value.email;
      this.http.get<UserResponse>(`/api/users/email/${email}`).subscribe(
        (res) => {
          console.log(res.email);
          if (this.myEmail == res.email) {
            this.findErrors.push('Cannot add your email!');
          } else if (this.userEmails.includes(res.email)) {
            this.findErrors.push('User already exists!');
          } else {
            this.userEmails.push(res.email);
            console.log(this.userEmails);
          }
        },
        (error) => {
          console.log(error.error);
          this.findErrors.push(error);
        }
      );
    }

    this.addEmailForm.reset();
  }
}
