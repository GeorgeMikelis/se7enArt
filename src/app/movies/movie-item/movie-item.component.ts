import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/domain/movies.service';

import { Movie } from 'src/app/models/movie.model';


@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css']
})
export class MovieItemComponent implements OnInit {
  @Input()
  movie: Movie;
  @Input()
  onFavorites: boolean;

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
  }

  toFavorites() {
    this.moviesService.manageFavorites(this.movie);
  }

}
