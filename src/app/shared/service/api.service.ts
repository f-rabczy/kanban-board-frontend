import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../models/user.model';
import {Observable} from 'rxjs';
import {UserBoard} from '../../models/board.model';
import {UserTask} from '../../models/task.model';
import {TaskColor} from '../../models/task-color.model';
import {Project} from '../../models/project/project.model';
import {Task} from 'protractor/built/taskScheduler';
import {ProjectTaskComment} from '../../models/project/project-task-comment.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private CURRENT_USER_ID = sessionStorage.getItem('ID');

  private BASE_URL = 'http://localhost:8080/';
  private USER_URL = this.BASE_URL + 'users/' + this.CURRENT_USER_ID;

  private REGISTER_URL = this.BASE_URL + 'register';
  private LOGIN_URL = this.BASE_URL + 'login';

  private USER_BOARD_URL = this.USER_URL + '/boards';
  private USER_TASK_URL = this.USER_URL + '/tasks' ;
  private USER_TASK_COLOR_URL = this.USER_TASK_URL + '/colors'

  private USER_IMAGE_URL = this.USER_URL +'/images';

  private USER_PROJECTS_URL = this.USER_URL + '/projects';

  constructor(
    private http: HttpClient
  ) {}

  postRegister(inputUsername: string, inputPassword: string, inputEmail: string, inputFirstName: string, inputLastName: string): Observable<any> {
    window.alert(inputFirstName + ' ' + inputLastName)
    return this.http.post(this.REGISTER_URL, {
      username: inputUsername,
      email: inputEmail,
      password: inputPassword,
      firstName: inputFirstName,
      lastName: inputLastName
    });
  }

  postLogin(inputUsername: string, inputPassword: string): Observable<any> {
    return this.http.post(this.LOGIN_URL, {
      username: inputUsername,
      password: inputPassword
    });
  }

  postCreateTask(inputName: string, inputDescription: string, inputStatus: string, inputColor: string): Observable<any>{
    return this.http.post(this.USER_TASK_URL,{
      title: inputName,
      description: inputDescription,
      status: inputStatus,
      taskColor: inputColor
    })
  }

  postUploadImage(file:File): Observable<any>{
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile',file,file.name);

    return this.http.post(this.USER_IMAGE_URL,uploadImageData,{observe:'response'});
  }

  postCreateProjectTask(inputName: string, inputDescription: string, inputStatus: string, inputColor: string,inputDeadline: string, inputProjectID: string): Observable<any>{
    return this.http.post(this.USER_PROJECTS_URL  + '/' + inputProjectID + '/boards/tasks',{
      title: inputName,
      description: inputDescription,
      status: inputStatus,
      taskColor: inputColor,
      deadline: inputDeadline
    })
  }

  postAddComment(inputProjectID: string,inputTaskID: string, content: string): Observable<any>{
    return this.http.post(this.USER_PROJECTS_URL  + '/' + inputProjectID + '/boards/tasks/' + inputTaskID +'/comments',{
      content:content
    })
  }


  getUser(): Observable<User>{
    return this.http.get<User>(this.USER_URL);
  }

  getUserBoard(): Observable<UserBoard> {
    return this.http.get<UserBoard>(this.USER_BOARD_URL);
  }

  getDownloadImage(): Observable<any>{
    return  this.http.get(this.USER_IMAGE_URL)
  }

  getColors(): Observable<TaskColor[]>{
    return this.http.get<TaskColor[]>(this.USER_TASK_COLOR_URL);
  }

  getAllProjects(): Observable<Project[]>{
    return this.http.get<Project[]>(this.USER_PROJECTS_URL);
  }

  getOneProject(inputProjectID: string): Observable<Project>{
    return this.http.get<Project>(this.USER_PROJECTS_URL + '/' + inputProjectID);
  }

  getComments(inputProjectID : string, inputTaskID: string, ): Observable<ProjectTaskComment[]>{
    return this.http.get<ProjectTaskComment[]>(this.USER_PROJECTS_URL  + '/' + inputProjectID + '/boards/tasks/' + inputTaskID +'/comments'
    );
  }

  putUpdateUserBoard(inputBoard: UserBoard): Observable<any>{
    return this.http.put(this.USER_BOARD_URL + '/' + inputBoard.id,{
      id: inputBoard.id,
      name: inputBoard.name,
      columns: inputBoard.columns
    });
  }

  putUpdateProjectBoard(inputProject: Project): Observable<any>{
    return this.http.put(this.USER_PROJECTS_URL + '/' + inputProject.board.id + '/boards',{
      name: inputProject.name,
      board: inputProject.board
    })
  }

  putUpdateProjectBoardName(inputName: string, inputProjectID: string): Observable<any>{
    return this.http.put(this.USER_PROJECTS_URL + '/' + inputProjectID + '/boards/name',{
      name: inputName
    })
  }

  putUpdateBoardName(inputBoardID: string, inputNewName: string): Observable<any>{
    return this.http.put(this.USER_BOARD_URL + '/' + inputBoardID + '/name',{
      name: inputNewName
    })
  }

  putUpdateUserTask(inputID: string, inputTitle: string, inputDescription: string, inputColor: string): Observable<any>{
    return this.http.put(this.USER_TASK_URL + '/' + inputID,{
      title: inputTitle,
      description: inputDescription,
      taskColor: inputColor
    })
  }

  putUpdateProjectTask(inputProjectID: string,inputTaskID: string, inputTitle: string, inputDescription: string, inputColor: string): Observable<any>{
    return this.http.put(this.USER_PROJECTS_URL  + '/' + inputProjectID + '/boards/tasks/' + inputTaskID,{
      title: inputTitle,
      description: inputDescription,
      taskColor: inputColor
    })
  }

  putEditProfile(inputFirstName: string, inputLastName: string, inputEmail: string):Observable<any>{
    return this.http.put(this.USER_URL,{
      firstName: inputFirstName,
      lastName: inputLastName,
      email: inputEmail
    })
  }

  putLeaveProject(inputProjectID: string): Observable<any>{
    return this.http.put(this.USER_PROJECTS_URL + '/' + inputProjectID,{});
  }

  deleteRemoveUserTask(inputID: string): Observable<any>{
    return this.http.delete(this.USER_TASK_URL + '/' + inputID);
  }

  deleteRemoveProjectTask(inputProjectID: string, inputTaskID: string): Observable<any>{
    return this.http.delete(this.USER_PROJECTS_URL  + '/' + inputProjectID + '/boards/tasks/' + inputTaskID);
  }


}


