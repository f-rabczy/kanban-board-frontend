import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ApiService} from '../../../../shared/service/api.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {EditBoardNameInterface} from '../../../../interface/edit-board-name.interface';
import {EditProjectBoardNameInterface} from '../../../../interface/edit-project-board-name.interface';

@Component({
  selector: 'app-edit-project-board-name-form',
  templateUrl: './edit-project-board-name-form.component.html',
  styleUrls: ['./edit-project-board-name-form.component.css']
})
export class EditProjectBoardNameFormComponent implements OnInit {

  myForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<EditProjectBoardNameFormComponent>,
              private apiService: ApiService,
              private fb:FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: EditProjectBoardNameInterface) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      name: this.data.project.board.name
    })
  }

  edit(newName:string, projectID: string ): void{
    this.apiService.putUpdateProjectBoardName(newName,projectID).subscribe();
    this.dialogRef.close();
    location.reload();
  }
  onNoClick(): void{
    this.dialogRef.close();
  }

}
