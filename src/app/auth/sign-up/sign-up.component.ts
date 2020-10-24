import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/domain/auth.service';
import { bothUpperCaseLowerCaseValidator } from '../validators/upper-lower-case-validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  passwordsMatch: boolean;

  signupForm = new FormGroup({
    firstname: new FormControl('', [
      Validators.required,
    ]),
    lastname: new FormControl('', [
      Validators.required,
    ]),
    username: new FormControl('', [
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      bothUpperCaseLowerCaseValidator
    ]),
    password2: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      bothUpperCaseLowerCaseValidator
    ]),
  });

  get firstname() { return this.signupForm.get('firstname'); }
  get lastname() { return this.signupForm.get('lastname'); }
  get username() { return this.signupForm.get('username'); }
  get password() { return this.signupForm.get('password'); }
  get password2() { return this.signupForm.get('password2'); }

  constructor(private authServeice: AuthService) {}

  ngOnInit(): void {
    this.passwordsMatch = true;
  }

  onSubmit() {
    let firstname = this.signupForm.value.firstname;
    let lastname = this.signupForm.value.lastname;
    let username = this.signupForm.value.username;
    let password = this.signupForm.value.password;
    let password2 = this.signupForm.value.password2;

    if (password === password2) {
      this.passwordsMatch = true;
      console.warn(this.signupForm.value);
      this.authServeice.signUp(firstname, lastname, username, password).subscribe(resData => console.log(resData));
    } else {
      this.passwordsMatch = false;
      console.log('Passwords do not match');
    }
  }
}
