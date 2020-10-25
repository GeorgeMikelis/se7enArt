import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/domain/auth.service';
import { UserWithJWT } from 'src/app/models/user-with-jwt';
import { bothUpperCaseLowerCaseValidator } from '../validators/upper-lower-case-validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit, OnDestroy {
  passwordsMatch: boolean;
  error: string = null;
  newUser: boolean = true;
  private userSub: Subscription;
  user: UserWithJWT;

  signupForm = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      bothUpperCaseLowerCaseValidator,
    ]),
    password2: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      bothUpperCaseLowerCaseValidator,
    ]),
  });

  get firstname() {
    return this.signupForm.get('firstname');
  }
  get lastname() {
    return this.signupForm.get('lastname');
  }
  get username() {
    return this.signupForm.get('username');
  }
  get password() {
    return this.signupForm.get('password');
  }
  get password2() {
    return this.signupForm.get('password2');
  }

  constructor(private authServeice: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.passwordsMatch = true;
    this.userSub = this.authServeice.user.subscribe((user) => {
      this.user = user;
      console.log(this.user);
    });

    let userString = localStorage.getItem('userData');
    if (!userString) {
      userString = sessionStorage.getItem('userData');
    }
    this.user = JSON.parse(userString);
    console.log(this.user);

    if (this.user) {
      this.newUser = false;
      this.signupForm.patchValue({
        firstname: this.user.firstname,
        lastname: this.user.lastname,
        username: this.user.username,
      });
    }
  }

  onSubmit() {
    let firstname = this.signupForm.value.firstname;
    let lastname = this.signupForm.value.lastname;
    let username = this.signupForm.value.username;
    let password = this.signupForm.value.password;
    let password2 = this.signupForm.value.password2;

    if (password === password2) {
      if (this.user) {
        this.passwordsMatch = true;
        console.warn(this.signupForm.value);
        this.authServeice
          .updateUser(firstname, lastname, username, password)
          .subscribe(
            (resData) => {
              console.log(resData);
              console.log('update occured');
            },
            (errorMessage) => {
              console.log(errorMessage);
              this.error = errorMessage;
            }
          );
      } else {
        this.passwordsMatch = true;
        console.warn(this.signupForm.value);
        this.authServeice
          .signUp(firstname, lastname, username, password)
          .subscribe(
            (resData) => {
              console.log(resData);
              console.log('update occured');
            },
            (errorMessage) => {
              console.log(errorMessage);
              this.error = errorMessage;
            }
          );
      }
    } else {
      this.passwordsMatch = false;
      console.log('Passwords do not match');
    }
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
