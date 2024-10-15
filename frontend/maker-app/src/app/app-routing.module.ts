import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { authenticationcard } from './guard/guard';
import { QuestionpaperComponent } from './questionpaper/questionpaper.component';
import { SubjectComponentComponent } from './subject-component/subject-component.component';
import { CreateQuestionComponent } from './question-paper-form/question-paper-form.component';
import { DisplayQuestionPaperComponent } from './display-question-paper/display-question-paper.component';

const routes: Routes = [

  {
    path: "",
    redirectTo: "home",
    pathMatch: 'full'
  },
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "signup",
    component: SignupComponent
  },
  {
    path: "login",
    component: LoginComponent
  },

  {
    path: "dashboard",
    component: DashBoardComponent,
    // canActivate:[authenticationcard],
    children: [
      {
        path: "subject",
        component: SubjectComponentComponent,
        children: [
          {
            path: "questionpaper/:_id/:subjectName",
            component: QuestionpaperComponent,
            children:
              [
                {
                  path: "questionPaperForm/:questionId",
                  component: CreateQuestionComponent,
                },
                {
                  path: "displayquestionPaper/:questionId",
                  component: DisplayQuestionPaperComponent
                }
              ]

          }
        ]
      },
    ]
  },
  {
    path: "questionpaper",
    component: QuestionpaperComponent,
    children:
      [
        {
          path: "questionPaperForm/:questionId",
          component: CreateQuestionComponent,
        },
        {
          path: "displayquestionPaper/:questionId",
          component: DisplayQuestionPaperComponent
        }
      ]
  }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
