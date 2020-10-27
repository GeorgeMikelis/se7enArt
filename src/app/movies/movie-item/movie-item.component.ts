import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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

  @Input()
  favoriteMovies: Movie[];

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    // for (let i; i < this.favoriteMovies.length; i++) {
    //   this.movie.id === this.favoriteMovies[i].id ? this.onFavorites = true : this.onFavorites = null;
    // }
    // console.log(this.onFavorites)
  }

  toFavorites() {
    this.moviesService.addMovieToUserFavorites(this.movie);
  }

  remove() {
    this.moviesService.removeMovieFromUserFavorites(this.movie.favoriteId);
  }
}
