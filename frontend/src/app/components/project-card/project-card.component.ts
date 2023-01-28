import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { faPeopleArrows } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css'],
})
export class ProjectCardComponent {
  teamworkIcon = faPeopleArrows;
  @Input() userId: string = '';
  @Input() projectId: string = '';
  @Input() projectTitle: string = '';
  @Input() projectDescription: string = '';
  @Input() projectMemberCount: number = 0;

  constructor(private router: Router, private http: HttpClient) {}

  onClick() {
    this.router.navigate(['project', this.userId, this.projectId]);
  }

  deleteProject() {
    this.http.delete(`/api/projects/${this.projectId}`).subscribe(
      (response) => {
        console.log(response);
        location.reload();
      },
      (error) => {
        console.log(error.error);
      }
    );
  }
}
