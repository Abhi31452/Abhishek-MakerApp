import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserCrudService } from '../customServices/user-crud.service';
import { Subject } from '../customClasses/subject';

@Component({
  selector: 'app-subject-component',
  templateUrl: './subject-component.component.html',
  styleUrls: ['./subject-component.component.css']
})
export class SubjectComponentComponent implements OnInit {
  isSubject: boolean = false;
  subName: Subject[] = [];
  questionpaper: any[] = []; // Use appropriate type

  subjectForm = new FormGroup({
    subjectName: new FormControl<string | null>('', Validators.required)
  });

  constructor(public route: Router, public usercrud: UserCrudService) {
    this.route.events.subscribe((event: any) => {
      if (event.url) {
        this.isSubject = this.route.url === "/dashboard/subject";
      }
    });
  }

  ngOnInit() {
    this.fetchSubjects();
    console.log("ngOnInit... getAllQuest");
    this.usercrud.getAllQuestionPaper().subscribe(
      response => {
        if (response.Success) {
          console.log("success");
          this.questionpaper = response.data;
          console.log(this.questionpaper);
        } else {
          alert('Failed to load QuestionPaper');
        }
      }, error => {
        console.log("No Question Paper ", error);
      }
    );
  }

  onSubmit() {
    console.log(this.subjectForm.value);

    if (this.subjectForm.valid) {

      const subjectNameValue = this.subjectForm.value.subjectName;
      const subjectName: string = subjectNameValue || '';
      const newSubject = new Subject( undefined,subjectName);
      this.usercrud.addSubject(newSubject).subscribe(
        response => {
          if (response.Success) {
            alert('Subject added Successfully');
            this.subjectForm.reset();
            this.route.navigate(['/dashboard']);
          } else {
            alert('Failed to add Subject ' + response.message);
          }
        }, error => {
          console.error("Error in Adding Subject", error);
          alert('Error adding subject: ' + (error.message || 'Unknown error'));
        }
      );
    } else {
      alert('Please fill in the subject name');
    }
  }

  //fetchSubject

  fetchSubjects() {
    this.usercrud.getAllSubject().subscribe(
      response => {
        if (response.Success) {
          console.log(response.data);
          this.subName = response.data.map(item => new Subject(item._id, item.subjectName,item.paperCount));
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


  //Delete Subject 

  deleteSubject(_id: string) {
    console.log("delete function......", _id);
    this.usercrud.deleteSubject(_id).subscribe(
      response => {
        if (response.Success) {
          alert('Removed Subject with SubjectName');
        } else {
          alert('Failed to remove Subject ' + response.message);
        }
      },
      error => {
        console.error("No Subject ", error);
      }
    );
    this.route.navigate(['dashboard']);
  }


}
