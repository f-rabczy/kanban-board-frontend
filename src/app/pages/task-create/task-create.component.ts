import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../shared/service/api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TaskColor} from '../../models/task-color.model';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent implements OnInit {
  title: string;
  description: string;
  status: string;
  selectedColor: TaskColor;
  caughtStatus: string;
  colors: TaskColor[];


  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    private fb:FormBuilder,
  ) { }

  myForm= new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    taskColor: new FormControl('')
  });

  ngOnInit(): void {
    this.catchTaskStatus();
    this.apiService.getColors().subscribe(data =>{
      this.colors = data;
    })

  }

  create(): void{
    this.apiService.
    postCreateTask(
      this.myForm.controls['title'].value,
      this.myForm.controls['description'].value,
      this.caughtStatus,
      this.myForm.controls['taskColor'].value
    ).
    subscribe();
     this.router.navigate(['/board']).then();
  }

  catchTaskStatus(): void {
    this.route.queryParams.subscribe(params => {
      if (params.status !== undefined) {
        this.caughtStatus = params.status;
      }})



      // }
      // if (params.status === 'In Progress' && params.status !== undefined) {
      //   this.caughtStatus = 'In Progress';
      // }
      // if (params.status === 'Done' && params.status !== undefined) {
      //   this.caughtStatus = 'Done';
      // }

  }

}
