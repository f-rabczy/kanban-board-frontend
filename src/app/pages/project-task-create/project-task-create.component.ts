import { Component, OnInit } from '@angular/core';
import {TaskColor} from '../../models/task-color.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../shared/service/api.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {delay} from 'rxjs/operators';

@Component({
  selector: 'app-project-task-create',
  templateUrl: './project-task-create.component.html',
  styleUrls: ['./project-task-create.component.css']
})
export class ProjectTaskCreateComponent implements OnInit {
  minDate: Date;
  maxDate: Date;
  colors: TaskColor[];
  caughtStatus: string;
  projectID: string;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth()
    const currentDay = new Date().getDate();
    this.minDate = new Date(currentYear , currentMonth, currentDay);
    this.maxDate = new Date(currentYear + 5, 11, 31);
  }

  myForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    taskColor: new FormControl(''),
    deadline: new FormControl()
  });

  ngOnInit(): void {
    this.catchTaskStatus();
    this.apiService.getColors().subscribe(data =>{
      this.colors = data;
    })
  }

  catchTaskStatus(): void {
    this.route.queryParams.subscribe(params => {
      if (params.status !== undefined) {
        this.caughtStatus = params.status;
      }
      if(params.projectID !== undefined){
        this.projectID = params.projectID;
      }
    })

  }

  formatDate() : string{
    if(this.myForm.controls['deadline'].value !== null){
      let testDay = this.myForm.controls['deadline'].value.getDate();
      let chosenDay;

      if(testDay < 10){
        chosenDay = '0'+ testDay.toString();
      }else{
        chosenDay = testDay;
      }

      let testMonth = this.myForm.controls['deadline'].value.getMonth() + 1;
      let chosenMonth
      if(testMonth < 10){
        chosenMonth = '0' + testMonth.toString();
      }else{
        chosenMonth = testMonth;
      }

      let chosenYear = this.myForm.controls['deadline'].value.getFullYear()
      return `${chosenDay}/${chosenMonth}/${chosenYear}`
    }else{
      return null;
    }

  }

  create(): void{
      this.apiService.
      postCreateProjectTask(
        this.myForm.controls['title'].value,
        this.myForm.controls['description'].value,
        this.caughtStatus,
        this.myForm.controls['taskColor'].value,
        this.formatDate(),
        this.projectID
      ).
      subscribe();
      this.timeout(2000)
      this.router.navigate(['project'],{queryParams:{id: this.projectID, refresh:'yes'}}).then();

    }

  timeout(ms) { //pass a time in milliseconds to this function
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
