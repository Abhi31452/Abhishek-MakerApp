import { Component } from '@angular/core';
import { UserSeviceService } from '../customServices/user-sevice.service';
import { AuthService } from '../customServices/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent {
  isLoggedIn : Boolean = false;
  constructor(public userService : UserSeviceService , private authService: AuthService){}

ngOnit(){
  this.authService.checkInitialState();
}
}
