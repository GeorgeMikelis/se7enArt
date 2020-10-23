import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { bothUpperCaseLowerCaseValidator } from '../validators/upper-lower-case-validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signupForm = new FormGroup({
    firstname: new FormControl('', [
      Validators.required,
    ]),
    lastname: new FormControl('', [
      Validators.required,
    ]),
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(4)
    ]),
    password: new FormControl('', [
      Validators.required,
      bothUpperCaseLowerCaseValidator
    ]),
    password2: new FormControl('', [
      Validators.required,
      bothUpperCaseLowerCaseValidator
    ]),
  });

  get firstname() { return this.signupForm.get('firstname'); }
  get lastname() { return this.signupForm.get('lastname'); }
  get username() { return this.signupForm.get('username'); }
  get password() { return this.signupForm.get('password'); }
  get password2() { return this.signupForm.get('password2'); }

  ngOnInit(): void {
  }

  onSubmit() {
    console.warn(this.signupForm.value);
  }
}
