import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ApiService} from '../../../../shared/service/api.service';
import {UserBoard} from '../../../../models/board.model';
import {EditBoardNameInterface} from '../../../../interface/edit-board-name.interface';

@Component({
  selector: 'app-edit-board-name-form',
  templateUrl: './edit-board-name-form.component.html',
  styleUrls: ['./edit-board-name-form.component.css']
})
export class EditBoardNameFormComponent implements OnInit {

  myForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditBoardNameFormComponent>,
    private apiService: ApiService,
    private fb:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: EditBoardNameInterface
  ) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      name: this.data.board.name
    })
  }

  edit(boardID: string, newName:string ): void{
    this.apiService.putUpdateBoardName(boardID,newName).subscribe();
    this.dialogRef.close();
    location.reload();
  }
  onNoClick(): void{
    this.dialogRef.close();
  }

}
