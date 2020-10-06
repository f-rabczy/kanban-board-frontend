import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public getToken(): string {
    return sessionStorage.getItem('Token');
  }

  isUserLoggedIn() {
    const check = sessionStorage.getItem('Token');
    return !(check === null);
  }

  logOut() {
    sessionStorage.removeItem('Token');
    sessionStorage.removeItem('ID');
    this.goToHomePage();
  }

  goToHomePage() {
    window.location.href = 'http://localhost:4200';
  }


}
