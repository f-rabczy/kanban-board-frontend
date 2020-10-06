import {Component, OnInit} from '@angular/core';
import {Project} from '../../models/project/project.model';
import {ApiService} from '../../shared/service/api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {UserTask} from '../../models/task.model';
import {ProjectTask} from '../../models/project/project-task.model';
import {MatDialog} from '@angular/material/dialog';
import {UserBoard} from '../../models/board.model';
import {EditBoardNameFormComponent} from '../dialog/form/edit-board-name-form/edit-board-name-form.component';
import {EditProjectBoardNameFormComponent} from '../dialog/form/edit-project-board-name-form/edit-project-board-name-form.component';
import {EditTaskFormComponent} from '../dialog/form/edit-task-form/edit-task-form.component';
import {EditProjectTaskFormComponent} from '../dialog/form/edit-project-task-form/edit-project-task-form.component';


@Component({
  selector: 'app-project-display',
  templateUrl: './project-display.component.html',
  styleUrls: ['./project-display.component.scss']
})
export class ProjectDisplayComponent implements OnInit {
  project: Project;
  isShow = false;
  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {
  }

  ngOnInit(): void {

    this.getProject()
  }

  getProject() {
    let id: string;
    this.route.queryParams.subscribe(params =>{
      if(params.refresh ==='yes'){
        this.router.navigate(['project'],{queryParams:{id: params.id, refresh:'no'}}).then();
      }
      if(params.id !== undefined){
        id = params.id;
        this.apiService.getOneProject(id).subscribe(data => {
          this.project = data;
        });
      }else{
        window.alert("Error")
      }
    })
  }

  drop(event: CdkDragDrop<ProjectTask[], any>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);

      event.previousContainer.data.forEach((x, index) => {
        x.order = index;
      });

    }
    event.container.data.forEach((x, index) => {
      x.order = index
    })
    this.apiService.putUpdateProjectBoard(this.project).subscribe();
  }

  openEditProjectBoardNameForm(projectToEdit: Project): void {
    this.dialog.open(EditProjectBoardNameFormComponent, {
      width: '300px',
      height: '220px',
      data: {project: projectToEdit}
    });
  }

  deleteTask(inputProjectID: string, inputTaskID: string){
    this.apiService.deleteRemoveProjectTask(inputProjectID,inputTaskID).subscribe();
    location.reload();
  }

  openEditProjectTaskForm(taskToEdit: ProjectTask,projectID: string): void {
    this.dialog.open(EditProjectTaskFormComponent, {
      width: '300px',
      height: '400x',
      data: {task: taskToEdit,
            projectID:projectID}
    });
  }

  goToCreateTask(status: string,projectID: string): void {
    this.router.navigate(['/project-task-create'], {queryParams: {status: status, projectID: projectID }}).then();
  }


  toggleDisplay() {
    this.isShow = !this.isShow;
  }

  goToComment(taskID: string): void {
    this.router.navigate(['/comments'], {queryParams: {taskID: taskID, projectID: this.project.id }}).then();
  }

}
