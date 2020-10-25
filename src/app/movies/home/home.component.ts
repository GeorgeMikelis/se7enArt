import { Component, OnInit } from '@angular/core';
import { UserWithJWT } from 'src/app/models/user-with-jwt';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: UserWithJWT;

  constructor() { }

  ngOnInit(): void {
    let userString = localStorage.getItem('userData');
    if (!userString) {
      userString = sessionStorage.getItem('userData');
    }
    this.user = JSON.parse(userString);
  }

}
