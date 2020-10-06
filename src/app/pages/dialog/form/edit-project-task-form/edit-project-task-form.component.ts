import {Component, Inject, OnInit} from '@angular/core';
import {TaskColor} from '../../../../models/task-color.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {EditTaskDataInterface} from '../../../../interface/edit-task-data.interface';
import {ApiService} from '../../../../shared/service/api.service';
import {EditProjectTaskDataInterface} from '../../../../interface/edit-project-task-data.interface';

@Component({
  selector: 'app-edit-project-task-form',
  templateUrl: './edit-project-task-form.component.html',
  styleUrls: ['./edit-project-task-form.component.css']
})
export class EditProjectTaskFormComponent implements OnInit {
  title: string;
  description: string;
  colors: TaskColor[];
  myForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditProjectTaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditProjectTaskDataInterface,
    private apiService:ApiService,
    private fb:FormBuilder,
  ) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      title: this.data.task.title,
      description: this.data.task.description,
      taskColor: this.data.task.taskColor.name
    })
    this.apiService.getColors().subscribe(data =>{
      this.colors = data;
    })
  }

  onNoClick(): void{
    this.dialogRef.close();
  }

  editTask(): void{
    this.apiService.putUpdateProjectTask(
      this.data.projectID,
      this.data.task.id,
      this.myForm.controls['title'].value,
      this.myForm.controls['description'].value,
      this.myForm.controls['taskColor'].value
    ).subscribe();
    this.dialogRef.close();
    location.reload();
  }

}
