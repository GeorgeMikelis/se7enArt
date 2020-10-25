import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/domain/auth.service';
import { bothUpperCaseLowerCaseValidator } from '../validators/upper-lower-case-validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error: string = null;

  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      bothUpperCaseLowerCaseValidator
    ]),
    rememberMe: new FormControl(true),
  });

  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }
  get rememberMe() { return this.loginForm.get('rememberMe'); }

  constructor(private authServeice: AuthService, private router: Router) {}

  ngOnInit(): void {
  }

  onSubmit() {
    console.warn(this.loginForm.value);
    let username = this.loginForm.value.username;
    let password = this.loginForm.value.password;
    let rememberMe = this.loginForm.value.rememberMe;
    this.authServeice.login(username, password, rememberMe).subscribe(
      resData => {
        console.log(resData)
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
    }
    );
  }
}
