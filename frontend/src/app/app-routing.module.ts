import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectPageComponent } from './project-page/project-page.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { ProjectEditPageComponent } from './project-edit-page/project-edit-page.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignUpPageComponent },
  { path: 'dashboard/:id', component: DashboardComponent },
  { path: 'project/:id/:projectid', component: ProjectPageComponent },
  { path: 'create/:id', component: CreateProjectComponent },
  { path: 'edit/:id/:projectid', component: ProjectEditPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
