import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private LoggedIn = new BehaviorSubject<boolean>(false);
  public isLoggedin$ = this.LoggedIn.asObservable();

  constructor() { }

  login() {
    this.LoggedIn.next(true);
    localStorage.setItem("isLoggedIn" , "true");
  }

  logout(){
    this.LoggedIn.next(false);
    localStorage.removeItem("isLoggedIn" );
  }
  checkInitialState(){
    const isloggedInstatus = localStorage.getItem("isLoggedIn")=="true";
    console.log(localStorage.getItem("isLoggedIn"));
    this.LoggedIn.next(isloggedInstatus);
  }
}
