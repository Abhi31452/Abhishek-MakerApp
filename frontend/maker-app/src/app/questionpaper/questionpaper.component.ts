import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserCrudService } from '../customServices/user-crud.service';
import { QuestionPaper } from '../customClasses/question-paper';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from '../customClasses/subject';

@Component({
  selector: 'app-questionpaper',
  templateUrl: './questionpaper.component.html',
  styleUrls: ['./questionpaper.component.css'] // Fix for "styleUrl"
})
export class QuestionpaperComponent {

  subjectId: String = "";
  subjectName: String = "";
  questionTitle: String = "";
  questionpaper: QuestionPaper[] = [];
  questionPaperForm: any;
  submissionMessage: string = "";
  isQuestionPaper: boolean = false;
  baseroute: string = "";
  directToQuestion: boolean = false;
  subName: Subject[] = [];
  SubjectName: string = ""
  SubjectId: string = ""
  isMatched: Boolean = false;
  paperCount: number = 0;
  con: any;


  constructor(private fb: FormBuilder, private route: ActivatedRoute, public router: Router, public usercrud: UserCrudService, public dialog: MatDialog) {
    this.router.events.subscribe((event: any) => {
      if (event.url) {
        // this.baseroute = this.router.url.split('/').slice(0, 4).join('/');
        this.isQuestionPaper = this.router.url.includes("/dashboard/subject/questionpaper");
        this.directToQuestion = this.router.url == "/questionpaper"
        // console.log(this.directToQuestion, "............")
      }
    });
    if (this.directToQuestion) {

    }

    this.questionPaperForm = this.fb.group({
      title: ['', Validators.required],
    });
  }



  ngOnInit() {

    this.route.params.subscribe(params => {

      this.subjectId = params['_id'];
      this.subjectName = params['subjectName'];

      console.log('Subject ID:', this.subjectId);
      console.log('Subject name:', this.subjectName);
    });

    this.fetchSubjects()
    this.getAllQuestionPAper()

  }

  onSubjectChange(subjectId: string) {
    this.SubjectId = subjectId;
    const selectedSubject = this.subName.find(subject => subject._id === this.SubjectId);

    if (selectedSubject) {
      this.subjectName = selectedSubject.subjectName;
      this.paperCount = selectedSubject.paperCount;
    }
    this.getAllQuestionPaper()

    console.log('Selected Subject ID:', this.SubjectId);
    console.log('Selected Subject Name:', this.subjectName);
  }

  onSubmit(): void {
    console.log(" in form component");
    
    if (this.questionPaperForm.valid) {
      const questionTitle = this.questionPaperForm.value;
      console.log("questionTitle", questionTitle)
      const dataToSend = {
        title: questionTitle.title,
        subjectId: this.subjectId
      };

      this.usercrud.addQuestionPaper(dataToSend).subscribe(
        response => {
          if (response.Success) {
            this.submissionMessage = 'Question paper added successfully!';
            alert("added Successfully")
            this.questionPaperForm.reset();
            this.router.navigate(['/dashboard/subject']);
          } else {
            this.submissionMessage = 'Failed to add question paper: ' + response.message;
          }
        },
        error => {
          console.error('Error adding question paper', error);
          this.submissionMessage = 'Error adding question paper: ' + (error.message || 'Unknown error');
        }
      );
    } else {
      this.submissionMessage = 'Please fill in all required fields.';
    }
  }

  fetchSubjects() {
    this.usercrud.getAllSubject().subscribe(
      response => {
        if (response.Success) {
          console.log(response.data);
          this.subName = response.data.map(item => new Subject(item._id, item.subjectName, item.paperCount));
          console.log("getAllSubject", this.subName);
        } else {
          alert('Failed to load Subject ' + response.message);
        }
      },
      error => {
        console.error("No Subject ", error);
      }
    );
  }


  getAllQuestionPAper() {
    this.usercrud.getAllQuestionPaper().subscribe(
      response => {
        if (response?.Success) {
          console.log("In QuestionPaper", response.data);

          // console.log("..................",this.subjectId)
          this.questionpaper = response.data
            .filter(item => item.subjectId === this.subjectId)
            .map(item => new QuestionPaper(item._id, item.title, item.subjectId, item.questionsId));


          console.log("Filtered Question Papers: ", this.questionpaper);
          if (this.questionpaper.length === 0) {
            console.log("No question papers found for this subject.");
          }
        }
      },
      error => {
        console.log("Error fetching question papers: ", error);
      }
    );
  }


  getAllQuestionPaper() {
    this.usercrud.getAllQuestionPaper().subscribe(
      response => {
        if (response?.Success) {
          console.log("In QuestionPaper", response.data);

          // console.log("..................",this.subjectId)
          this.questionpaper = response.data
            .filter(item => item.subjectId === this.SubjectId)
            .map(item => new QuestionPaper(item._id, item.title, item.subjectId, item.questionsId));


          console.log("Filtered Question Papers: ", this.questionpaper);
          if (this.questionpaper.length === 0) {
            console.log("No question papers found for this subject.");
          }
        }
      },
      error => {
        console.log("Error fetching question papers: ", error);
      }
    );
  }


  deleteQuestionPaper(_id: any) {

    if (window.confirm("Do you want to delete this question paper?")) {
      console.log(_id);

      this.usercrud.deleteQuestionPaper(_id).subscribe(

        response => {
          console.log(response.data);
          window.alert(" Question Paper Deleted")
        },
        error => {
          console.log(error, error.messaage);
        }
      )
    }
  }

}
