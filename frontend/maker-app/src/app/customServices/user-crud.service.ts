import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../customClasses/user';
import { Observable } from 'rxjs';
import { Subject } from '../customClasses/subject';
import { QuestionPaper } from '../customClasses/question-paper';

@Injectable({
  providedIn: 'root'
})
export class UserCrudService {

  url = "http://localhost:4000/api";

  constructor(public httpClient: HttpClient, public router: Router) { }

  addUser(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.url}/add`, user);
  }

  getAllQuestionPaper(): Observable<{ Success: boolean; data: any[]; subjectCount: number }> {
    return this.httpClient.get<{ Success: boolean; data: any[]; subjectCount: number }>(`${this.url}/getAllQuestionPaper` , {withCredentials:true});
  }

  addSubject(data: Subject): Observable<{ Success: boolean; message: string }> {
    return this.httpClient.post<{ Success: boolean; message: string }>(`${this.url}/addSubject`, data, {withCredentials:true});
  }

  getAllSubject(): Observable<{ Success: boolean, message: string, data: Subject[] }> {
    return this.httpClient.get<{ Success: boolean, message: string, data: Subject[] }>(`${this.url}/getAllSubject`,{withCredentials : true});
  }

  addQuestionPaper(data: Object): Observable<{ Success: boolean; message: string }> {
    return this.httpClient.post<{ Success: boolean; message: string }>(`${this.url}/addQuestionPaper`, data , {withCredentials:true});
  }

  deleteQuestionPaper(_id : String) : Observable<{Success : Boolean ; messaage : string  ; data :Object}>{
    return this.httpClient.delete<{Success : Boolean ; messaage : string ; data : Object}> (`${this.url}/deleteQuestionPaper/${_id}`, {withCredentials:true});
  }

  deleteSubject(_id: string): Observable<{ Success: boolean, message: string, data: Object }> {
    return this.httpClient.delete<{ Success: boolean, message: string, data: Object }>(`${this.url}/deleteSubject/${_id}`, {withCredentials:true});
  }

  addQuestion(data: any): Observable<{ Success: boolean; message: string; data: any }> {
    return this.httpClient.post<{ Success: boolean; message: string; data: any }>(`${this.url}/addQuestion`, data, {withCredentials:true});
  }

  getAllQuestion(_id: String): Observable<{ Success: boolean; message: string; data: any }> {
    return this.httpClient.get<{ Success: boolean; message: string; data: any }>(`${this.url}/getAllQuestion/${_id}`, {withCredentials:true});
  }

}
