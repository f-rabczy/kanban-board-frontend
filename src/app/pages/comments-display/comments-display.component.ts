import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../shared/service/api.service';
import {ProjectTaskComment} from '../../models/project/project-task-comment.model';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-comments-display',
  templateUrl: './comments-display.component.html',
  styleUrls: ['./comments-display.component.css']
})
export class CommentsDisplayComponent implements OnInit {
  taskID: string;
  projectID: string;
  comments: ProjectTaskComment[];
  myForm = new FormGroup({
    comment: new FormControl(''),
  });

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {
  }

  ngOnInit(): void {


    this.route.queryParams.subscribe(params => {
      if (params.taskID !== undefined) {
        this.taskID = params.taskID;
        this.projectID = params.projectID;
        this.apiService.getComments(this.projectID, this.taskID).subscribe(data => {
            this.comments = data;
          });
      }else{
        window.alert("Error");
      }
    })

  }

  addComment(){
    this.apiService.postAddComment(this.projectID,this.taskID,this.myForm.controls['comment'].value).subscribe();
    location.reload();
  }

  commentIddGenerator(id: string): string{
    return 'comment' + id;
  }
  replyIddGenerator(id: string): string{
    return 'reply' + id;
  }

  getLoggedUserID(): string{
    return sessionStorage.getItem('ID');
  }
}
