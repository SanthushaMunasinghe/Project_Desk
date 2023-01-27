import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { UserEmailsService } from './user-emails.service';
import { NewProjectService } from './new-project.service';

import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ProjectPageComponent } from './project-page/project-page.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { ProjectEditPageComponent } from './project-edit-page/project-edit-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { FooterComponent } from './components/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProjectCardComponent } from './components/project-card/project-card.component';
import { UserNavbarComponent } from './components/user-navbar/user-navbar.component';
import { ProjectTaskComponent } from './components/project-task/project-task.component';
import { MessageComponent } from './components/message/message.component';
import { ProjectTaskEditComponent } from './components/project-task-edit/project-task-edit.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { AddMemberComponent } from './components/add-member/add-member.component';
import { MemberComponent } from './components/member/member.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    LoginPageComponent,
    ProjectPageComponent,
    SignUpPageComponent,
    ProjectEditPageComponent,
    DashboardComponent,
    CreateProjectComponent,
    FooterComponent,
    ProjectCardComponent,
    UserNavbarComponent,
    ProjectTaskComponent,
    MessageComponent,
    ProjectTaskEditComponent,
    CreateTaskComponent,
    AddMemberComponent,
    MemberComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [UserEmailsService, NewProjectService],
  bootstrap: [AppComponent],
})
export class AppModule {}
