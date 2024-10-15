import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatIconModule } from '@angular/material/icon';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { FooterComponent } from './footer/footer.component';
import { QuestionpaperComponent } from './questionpaper/questionpaper.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SubjectComponentComponent } from './subject-component/subject-component.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { CreateQuestionComponent } from './question-paper-form/question-paper-form.component';
import { DisplayQuestionPaperComponent } from './display-question-paper/display-question-paper.component';
import { LogoutComponent } from './logout/logout.component';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    DashBoardComponent,
    FooterComponent,
    QuestionpaperComponent,
    SubjectComponentComponent,
    CreateQuestionComponent,
    DisplayQuestionPaperComponent,
    LogoutComponent,

  ],
  imports: [
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatIconModule,
    RouterModule,
    CommonModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatRadioModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot() 
    
  ],
  providers: [
    provideAnimationsAsync(), provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
