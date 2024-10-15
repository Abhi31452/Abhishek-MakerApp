import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { User } from '../customClasses/user';
import { Router } from '@angular/router';
import { UserSeviceService } from '../customServices/user-sevice.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  signup: FormGroup;
  user: User = new User();
  user1 : String = "";

  constructor(public router: Router, public usercrud: UserSeviceService) {

    this.signup = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern('[A-Za-z ]*')
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      phoneNo: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{10}$')
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(10),
        Validators.pattern('^[A-Za-z0-9]*$')
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
    }, { validators: this.passwordMatchValidator });
  }


  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }
  get username() {
    return this.signup.get("username");
  }

  get email() {
    return this.signup.get("email");
  }

  get phoneNo() {
    return this.signup.get("phoneNo");
  }

  get password() {
    return this.signup.get("password");
  }
  get confirmPassword() {
    return this.signup.get("confirmPassword");
  }

  ngOnInit(): void { }
  collectData() {
    this.user = this.signup.value;
    this.user1 = this.user.username;
    const obs = this.usercrud.signup(this.user);
    obs.subscribe({
      next: (data: Object) => {
        this.user = data as User;
        window.alert(`${this.user1} added successfully...`);
        this.router.navigate(["/home"])
      },
      error: (error: Error) => console.log(error)
    });
  }

}
