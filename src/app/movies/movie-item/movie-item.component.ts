import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MoviesService } from 'src/app/domain/movies.service';
import { Movie } from 'src/app/models/movie.model';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css'],
})
export class MovieItemComponent implements OnInit {
  @Input()
  movie: Movie;

  @Input()
  onFavorites: boolean;

  @Input()
  favoriteMovies: Movie[];

  constructor(private moviesService: MoviesService, private router: Router) {}

  ngOnInit(): void {
    // for (let i; i < this.favoriteMovies.length; i++) {
    //   this.movie.id === this.favoriteMovies[i].id ? this.onFavorites = true : this.onFavorites = null;
    // }
    // console.log(this.onFavorites)
  }

  toFavorites() {
    this.moviesService.addMovieToUserFavorites(this.movie);
  }

  onRemove() {
    this.moviesService.removeMovieFromUserFavorites(this.movie.favoriteId);
  }

  onUpdate() {
    this.router.navigate([`/movie-update/${this.movie.id}`]);
  }

  onDelete() {
    this.moviesService.deleteMovie(this.movie.id);
  }
}
