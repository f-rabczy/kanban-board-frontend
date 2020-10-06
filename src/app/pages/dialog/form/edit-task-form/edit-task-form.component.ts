import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {EditTaskDataInterface} from '../../../../interface/edit-task-data.interface';
import {ApiService} from '../../../../shared/service/api.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {TaskColor} from '../../../../models/task-color.model';

@Component({
  selector: 'app-pop-up-form',
  templateUrl: './edit-task-form.component.html',
  styleUrls: ['./edit-task-form.component.css']
})
export class EditTaskFormComponent implements OnInit {
  title: string;
  description: string;
  colors: TaskColor[];
  myForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditTaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditTaskDataInterface,
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

  edit(): void{
    this.apiService.putUpdateUserTask(this.data.task.id,
      this.myForm.controls['title'].value,
      this.myForm.controls['description'].value,
      this.myForm.controls['taskColor'].value
      ).subscribe();
    this.dialogRef.close();
    location.reload();
  }

}
