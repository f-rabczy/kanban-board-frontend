import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {UserBoard} from 'src/app/models/board.model';
import {UserTask} from '../../models/task.model';
import {HttpClient} from '@angular/common/http';
import {ApiService} from '../../shared/service/api.service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {EditTaskFormComponent} from '../dialog/form/edit-task-form/edit-task-form.component';
import {EditBoardNameFormComponent} from '../dialog/form/edit-board-name-form/edit-board-name-form.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tasks-display',
  templateUrl: './tasks-display.component.html',
  styleUrls: ['./tasks-display.component.scss']
})
export class TasksDisplayComponent implements OnInit {
  board: UserBoard;

  constructor(
    public http: HttpClient,
    private apiService: ApiService,
    public dialog: MatDialog,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.getBoard();
  }

  drop(event: CdkDragDrop<UserTask[], any>): void {
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
    event.container.data.forEach((x,index)=>{
      x.order=index})
    this.apiService.putUpdateUserBoard(this.board).subscribe();
  }

  getBoard() {
    this.apiService.getUserBoard().subscribe(data => {
      this.board = data;
    }, error => {
      window.alert(error);
    });
  }

  delete(id: string) {
    this.apiService.deleteRemoveUserTask(id).subscribe();
    location.reload();
  }

  openEditTaskForm(taskToEdit: UserTask): void {
    this.dialog.open(EditTaskFormComponent, {
      width: '300px',
      height: '400x',
      data: {task: taskToEdit}
    });
  }

  openEditBoardNameForm(boardToEdit: UserBoard): void {
    this.dialog.open(EditBoardNameFormComponent, {
      width: '300px',
      height: '220px',
      data: {board: boardToEdit}
    });
  }

  goToCreateTask(status: string): void {
    this.router.navigate(['/task-create'], {queryParams: {status: status}}).then();
  }


}
