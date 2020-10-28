import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-movies-search',
  templateUrl: './movies-search.component.html',
  styleUrls: ['./movies-search.component.css']
})
export class MoviesSearchComponent implements OnInit {
  @Output()
  userInput = new EventEmitter<string>();

  @Input()
  onFavorites: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
