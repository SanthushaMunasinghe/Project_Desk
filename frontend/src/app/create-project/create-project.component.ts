import { Component } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { UserEmailsService } from '../user-emails.service';
import { UserIdsService } from '../user-ids.service';

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

  addProjectForm = this.formBuilder.group({
    title: '',
    description: '',
  });

  project: object = {};

  submitErrors: string[] = [''];
  submitSuccess: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    private userEmailsService: UserEmailsService,
    private userIdsService: UserIdsService
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

    this.userEmailsService.clearEmails();
    this.userIdsService.clearIds();
  }

  onSubmit(): void {
    this.submitErrors = [];

    if (
      !this.addProjectForm.value.title ||
      !this.addProjectForm.value.description
    ) {
      this.submitErrors.push('Fill All Fields');
    }

    if (this.submitErrors.length == 0) {
      const project = {
        title: this.addProjectForm.value.title,
        description: this.addProjectForm.value.description,
        admin: this.userId,
        members: this.userIdsService.getIds(),
      };

      // Check if project title already exists
      this.http.get<any>(`/api/projects/title/${project.title}`).subscribe(
        (response) => {
          console.log(response);
          this.submitSuccess = 'Success!';
          this.project = project;
          // console.log(this.project);
        },
        (error) => {
          this.submitErrors.push(error.error.error);
        }
      );
    }
  }
}
