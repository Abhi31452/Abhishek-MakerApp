import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from '../customClasses/user';


@Injectable({
  providedIn: 'root'
})
export class UserSeviceService {

  url = "http://localhost:4000/api";
  loginFlag: boolean = false;
  username: String = "";

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    console.log("In service", username, password);
    this.username = username;
    return this.http.post<any>(`${this.url}/login`, { username, password }, { withCredentials: true });
  }

  logout(): Observable<any>{
    return this.http.get(`${this.url}/logout`, { withCredentials: true })
  }

  signup(user: User): Observable<Object> {
    console.log("Signup ....", user);
    return this.http.post(`${this.url}/signup`, user);
  }
}
