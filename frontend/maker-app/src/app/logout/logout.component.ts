import { Component } from '@angular/core';
import { AuthService } from '../customServices/auth.service';
import { UserCrudService } from '../customServices/user-crud.service';
import { UserSeviceService } from '../customServices/user-sevice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {

  constructor( private authService : AuthService ,public route : Router,public userService : UserSeviceService){}

logout(){
  console.log("logout button clicked")
  
    this.authService.logout();

    this.userService.logout().subscribe(
      response => {
        console.log(response.message); 
        this.route.navigate(['/home']);
      },
      error => {
        console.error('Logout failed:', error); 
      }
    );

  }


}
