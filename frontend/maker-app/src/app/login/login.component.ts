import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserSeviceService } from '../customServices/user-sevice.service';
import { Router } from '@angular/router';
import { AuthService } from '../customServices/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  toaster = inject(ToastrService);

  constructor(private formBuilder: FormBuilder, public router: Router, public userservice: UserSeviceService  ,private authservice :AuthService) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      
    });
    
  }
  login(){
      this.authservice.login();
  }

  ngOnInit(): void { }
  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      console.log(username, password)

      this.userservice.login(username, password).subscribe(
        (response) => {
          console.log("....toaster",this.toaster);
          this.toaster.success('Login Successfully' ,'success')
          // window.alert("Login Successfully ")
          this.userservice.loginFlag = true;
          this.login();
          this.router.navigate(["/dashboard"])
        },
        (error) => {
          console.error('Login failed', error);
          alert(`Login failed: ${error.message || 'Invalid credentials'}`);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }

  



}