import { Component } from '@angular/core';
import { UserCrudService } from '../customServices/user-crud.service';
import { Subject } from '../customClasses/subject';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrl: './dash-board.component.css'
})
export class DashBoardComponent {

  questionPaper: Number = 10;
  subjectName: String = "";
  QuestionPaeraddedperweek: Number = 12;
  TotalNoofQuestionPaper: Number = 100;
  allQuestionPapers: any;
  subjectCount: number = 0;
  questionCount: number = 0;
  subjectNameFetch: Subject[] = [];
  allSubject: Subject[] = [];
  isDashboardRoute: boolean = false;

  constructor(public route: Router, public userService: UserCrudService) {

    this.route.events.subscribe((event: any) => {
      if (event.url) {
        this.isDashboardRoute = this.route.url === "/dashboard";
      }
    });

  }

  ngOnInit(): void {
    this.getAllQuestionPaper();
    this.getAllSubject();
  }


  getAllQuestionPaper(): void {
    this.userService.getAllQuestionPaper().subscribe(
      (response: { Success: boolean; data: any[]; }) => {
        if (response.Success) {
          this.allQuestionPapers = response.data;
          this.questionCount = this.allQuestionPapers.length;

          console.log('All Question Papers:', this.allQuestionPapers);
          console.log('Subject Count:', this.subjectCount);
        }
      },
      (error: { message: any; }) => {
        console.error('Failed to fetch question papers', error);
        alert(`Failed to fetch question papers: ${error.message || 'Unknown error'}`);
      }
    );
  }


  getAllSubject(): void {
    this.userService.getAllSubject().subscribe(
      response => {
        if (response.Success) {
          this.subjectNameFetch = response.data.map(item => new Subject(item._id, item.subjectName));
          console.log(this.subjectNameFetch)
          this.subjectCount = this.subjectNameFetch.length;
        }
      },
      error => {
        console.log("No Subject ", error)
      }
    )
  }
}