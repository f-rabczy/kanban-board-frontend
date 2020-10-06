import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../shared/service/api.service';
import {Project} from '../../models/project/project.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-project-manager',
  templateUrl: './project-manager.component.html',
  styleUrls: ['./project-manager.component.css']
})
export class ProjectManagerComponent implements OnInit {
  projects: Project[];

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
     this.apiService.getAllProjects().subscribe(data =>{
       this.projects = data;
     });
  }

  idGenerator(id: string): string{
    return 'id' + id;
  }

  leaveProject(id: string){
    this.apiService.putLeaveProject(id).subscribe();
    location.reload();
  }

  goToProject(inputProjectID: string){
    this.router.navigate(['project'],{queryParams:{id: inputProjectID}}).then();
  }



}
