import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../shared/authentication/auth.service';

@Component({
  selector: 'app-navigationbar',
  templateUrl: './navigationbar.component.html',
  styleUrls: ['./navigationbar.component.css']
})
export class NavigationbarComponent implements OnInit {

  constructor(
    private route: Router,
    public authService: AuthService
  ) {
  }

  ngOnInit(): void {
  }


  backToHome(): void {
    this.route.navigate(['/']).then();
  }

  goToMyBoard(): void{
    this.route.navigate(['/board']).then();
  }

  goToMyProfile(): void{
    this.route.navigate(['/profile']).then();
  }

  goToMyProjects():void{
    this.route.navigate(['/my-projects']).then();
  }




}
