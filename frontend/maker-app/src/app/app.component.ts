import { Component } from '@angular/core';
import { AuthService } from './customServices/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'maker-app';

  constructor(private authService : AuthService) {
  }

  ngOnInit() {
    console.log(" inside app component c");
    this.authService.checkInitialState();
  }
}
