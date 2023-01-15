import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { CreateProjectFormComponent } from './create-project-form/create-project-form.component';
import { ProjectPageComponent } from './project-page/project-page.component';
import { MessagePageComponent } from './message-page/message-page.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'dashboard', component: UserDashboardComponent },
  { path: 'create', component: CreateProjectFormComponent },
  { path: 'project', component: ProjectPageComponent },
  { path: 'message', component: MessagePageComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    LoginPageComponent,
    UserDashboardComponent,
    CreateProjectFormComponent,
    ProjectPageComponent,
    MessagePageComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
