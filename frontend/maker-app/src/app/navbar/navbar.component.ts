import { Component } from '@angular/core';
import { UserSeviceService } from '../customServices/user-sevice.service';
import { Router } from '@angular/router';
import { AuthService } from '../customServices/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isLoggedIn : Boolean =false;
  constructor(public route: Router ,public userService : UserSeviceService , private authService :AuthService)
{}

ngOnInit() {
  this.authService.isLoggedin$.subscribe((status: Boolean) => {
    this.isLoggedIn = status;
  });
}
onclick(){
  // this.isLoggedIn  = true;
  this.authService.logout()
  this.route.navigate(['/login'])
}

}
