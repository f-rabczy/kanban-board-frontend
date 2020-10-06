import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user.model';
import {ApiService} from '../../shared/service/api.service';
import {Router} from '@angular/router';
import {query} from '@angular/animations';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  register(): void {
    this.apiService.postRegister(this.username,this.password,this.email,this.firstName,this.lastName).subscribe(
      () => {
        alert('User successfully registered');
        this.router.navigate(['login'],{queryParams:{registered: 'true'}}).then();
      },
      error => {
        window.alert(error)
      }
    );
  }


}
