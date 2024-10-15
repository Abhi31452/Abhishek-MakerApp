import { Component } from '@angular/core';
import { UserCrudService } from '../customServices/user-crud.service';
import { ActivatedRoute } from '@angular/router';
import { Questions } from '../customClasses/questions';

@Component({
  selector: 'app-display-question-paper',
  templateUrl: './display-question-paper.component.html',
  styleUrl: './display-question-paper.component.css'
})
export class DisplayQuestionPaperComponent {
  questionPaperId: string = "";
  questions: Questions[] = [];
  Array: any;
  showAns = false ;
  constructor(public usercrud: UserCrudService, public route: ActivatedRoute) {

  }

  ngOnInit() {
    console.log(this.questionPaperId);
    this.route.params.subscribe(params => {
      this.questionPaperId = this.route.snapshot.url[this.route.snapshot.url.length - 1].path;
      console.log('Question Paper ID:', this.questionPaperId);
    });
    this.usercrud.getAllQuestion(this.questionPaperId).subscribe(

      (response: { Success: boolean; message: string; data: any[] }) => {
        if (response.Success) {
          console.log("type of", typeof (response.data))
          console.log("Response Data ..in display", response.data);
          this.questions = response.data.map((item: any) =>
            new Questions(
              item.questionText,
              item.questionType,
              item.option,
              item.marks,
              item.correctAnswer,
              item.questionPaperId
            )
          );
        } else {
          console.log('Error:', response.message);
        }
      },
      (error) => {
        console.log('Error:', error.message);
      }
    );
    console.log("in display comp questions", this.questions)
  }

  showAnswer(){
    this.showAns=true;
  }
  hideAnswer() {
    this.showAns = false;
  }
}