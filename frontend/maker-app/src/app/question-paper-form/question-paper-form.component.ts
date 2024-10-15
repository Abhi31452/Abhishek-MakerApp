import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { UserCrudService } from '../customServices/user-crud.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-question-paper-form',
  templateUrl: './question-paper-form.component.html',
  styleUrls: ['./question-paper-form.component.css']
})
export class CreateQuestionComponent {
  questionForm: FormGroup;
  selectedType: string = '';
  questionPaperId: String = "";
  subjectName: any;

  constructor(private fb: FormBuilder, public usercrud: UserCrudService, public route: ActivatedRoute) {
    this.questionForm = this.fb.group({
      questionText: [''],
      questionType: [''],
      options: this.fb.array([]),
      marks: [''],
      correctAnswer: [''],
    });
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.questionPaperId = this.route.snapshot.url[this.route.snapshot.url.length - 1].path;
      console.log('Question Paper ID:', this.questionPaperId);
      console.log('Subject Name:', this.subjectName);
    });
  }

  onQuestionTypeChange(event: any) {
    this.selectedType = event.target.value;

    const optionsFormArray = this.questionForm.get('options') as FormArray;
    optionsFormArray.clear();

    if (this.selectedType === 'MCQ') {
      for (let i = 0; i < 4; i++) {
        optionsFormArray.push(this.fb.control(''));
      }
    } else if (this.selectedType === 'True/False') {
      for (let i = 0; i < 2; i++) {
        optionsFormArray.push(this.fb.control(''));
      }
    } else if (this.selectedType === 'Descriptive') {
      optionsFormArray.push(this.fb.control(''));
    }
  }

  get options() {
    return this.questionForm.get('options') as FormArray;
  }

  isMCQ() {
    return this.selectedType === 'MCQ';
  }

  isTrueFalse() {
    return this.selectedType === 'True/False';
  }

  isDescriptive() {
    return this.selectedType === 'Descriptive';
  }

  onSubmit() {
    console.log(this.questionForm.value);

    if (this.questionForm.valid) {
      const questionData = {
        questionText: this.questionForm.value.questionText,
        questionType: this.selectedType,
        option: this.questionForm.value.options,
        correctAnswer: this.questionForm.value.correctAnswer,
        marks: this.questionForm.value.marks,
        questionPaperId: this.questionPaperId
      };

      this.usercrud.addQuestion(questionData).subscribe(
        response => {
          if (response.Success) {
            alert('Question added successfully');
            this.questionForm.reset();
          } else {
            alert('Failed to add question: ' + response.message);
          }
        },
        error => {
          console.error("Error in Adding Question", error);
          alert('Error adding question: ' + (error.message || 'Unknown error'));
        }
      );
    } else {
      alert('Please fill in all required fields');
    }
  }

}
