import { Component, Input, OnChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { UserEmailsService } from '../../user-emails.service';

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

  findErrors: string[] = [''];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    public userEmailsService: UserEmailsService
  ) {}

  onSubmit(): void {
    this.findErrors = [];

    const userEmails = this.userEmailsService.getEmails();

    if (!this.addEmailForm.value.email) {
      this.findErrors.push('Enter an email');
    }

    if (userEmails.length >= 10) {
      this.findErrors.push('Reached maximum members!');
    }

    if (this.findErrors.length == 0) {
      const email = this.addEmailForm.value.email;
      this.http.get<UserResponse>(`/api/users/email/${email}`).subscribe(
        (res) => {
          console.log(res.email);
          if (this.myEmail == res.email) {
            this.findErrors.push('Cannot add your email!');
          } else if (userEmails.includes(res.email)) {
            this.findErrors.push('User already exists!');
          } else {
            this.userEmailsService.addEmail(res.email);
          }
        },
        (error) => {
          console.log(error.error);
          this.findErrors.push(error.error.message);
        }
      );
    }

    this.addEmailForm.reset();
  }
}
