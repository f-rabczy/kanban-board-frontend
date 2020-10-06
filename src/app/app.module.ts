import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationbarComponent } from './navigation/navigationbar/navigationbar.component';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TasksDisplayComponent } from './pages/tasks-display/tasks-display.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TokenInterceptor} from './shared/interceptor/token.interceptor';
import { TaskCreateComponent } from './pages/task-create/task-create.component';
import {MatDialogModule} from '@angular/material/dialog';
import { EditTaskFormComponent } from './pages/dialog/form/edit-task-form/edit-task-form.component';
import { EditBoardNameFormComponent } from './pages/dialog/form/edit-board-name-form/edit-board-name-form.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProjectManagerComponent } from './pages/project-manager/project-manager.component';
import { ProjectDisplayComponent } from './pages/project-display/project-display.component';
import { EditProjectBoardNameFormComponent } from './pages/dialog/form/edit-project-board-name-form/edit-project-board-name-form.component';
import { EditProjectTaskFormComponent } from './pages/dialog/form/edit-project-task-form/edit-project-task-form.component';
import { ProjectTaskCreateComponent } from './pages/project-task-create/project-task-create.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { CommentsDisplayComponent } from './pages/comments-display/comments-display.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationbarComponent,
    LoginComponent,
    RegisterComponent,
    TasksDisplayComponent,
    TaskCreateComponent,
    EditTaskFormComponent,
    EditBoardNameFormComponent,
    ProfileComponent,
    ProjectManagerComponent,
    ProjectDisplayComponent,
    EditProjectBoardNameFormComponent,
    EditProjectTaskFormComponent,
    ProjectTaskCreateComponent,
    CommentsDisplayComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    FormsModule,
    DragDropModule,
    HttpClientModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
