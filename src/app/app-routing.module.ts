import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RegisterComponent} from './pages/register/register.component';
import {LoginComponent} from './pages/login/login.component';
import {TasksDisplayComponent} from './pages/tasks-display/tasks-display.component';
import {TaskCreateComponent} from './pages/task-create/task-create.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {ProjectManagerComponent} from './pages/project-manager/project-manager.component';
import {ProjectDisplayComponent} from './pages/project-display/project-display.component';
import {ProjectTaskCreateComponent} from './pages/project-task-create/project-task-create.component';
import {CommentsDisplayComponent} from './pages/comments-display/comments-display.component';

const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'board', component: TasksDisplayComponent},
  {path: 'task-create', component: TaskCreateComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'my-projects', component: ProjectManagerComponent},
  {path: 'project' , component: ProjectDisplayComponent},
  {path: 'project-task-create', component: ProjectTaskCreateComponent},
  {path: 'comments', component: CommentsDisplayComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
