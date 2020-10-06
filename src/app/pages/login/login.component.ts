import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {ApiService} from '../../shared/service/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  infoMessage = '';

  HOME_URL = 'http://localhost:4200';

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {
  }

  ngOnInit(): void {
    this.displayRegisterSuccessInfo();
  }

  displayRegisterSuccessInfo(): void {
    this.route.queryParams.subscribe(params => {
      if (params.registered === 'true' && params.registered !== undefined) {
        this.infoMessage = 'Registration Successful! Please login';
      }
    });
  }

  login(): void {
    this.apiService.postLogin(this.username, this.password).subscribe(data =>{
      sessionStorage.setItem('Token',data.token);
      sessionStorage.setItem('ID',data.id);
      window.location.href = this.HOME_URL;
    }, error => {
      window.alert(error)
    })
  }

}
