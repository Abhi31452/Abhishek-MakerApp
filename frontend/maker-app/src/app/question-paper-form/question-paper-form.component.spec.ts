import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionPaperFormComponent } from './question-paper-form.component';

describe('QuestionPaperFormComponent', () => {
  let component: QuestionPaperFormComponent;
  let fixture: ComponentFixture<QuestionPaperFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuestionPaperFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionPaperFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
