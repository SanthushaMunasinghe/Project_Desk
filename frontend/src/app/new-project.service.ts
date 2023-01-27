import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NewProjectService {
  project: Object = {};

  constructor() {}

  assignToProject(newProject: Object) {
    this.project = newProject;
  }

  getProject() {
    return this.project;
  }
}
