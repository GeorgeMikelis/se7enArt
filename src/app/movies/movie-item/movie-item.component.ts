import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
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
  fromAllMovies: boolean;

  constructor(private moviesService: MoviesService, private router: Router) {}

  ngOnInit(): void {
  }

  manageFavorites() {
    console.log(this.onFavorites);
    if (this.onFavorites) {
      this.moviesService.removeMovieFromUserFavorites(this.movie.favoriteId);
      this.onFavorites = false;
    } else {
      this.moviesService.addMovieToUserFavorites(this.movie).subscribe(res => {
        this.movie.favoriteId = res.id;
      });
      this.onFavorites = true;
    }
  }

  onUpdate() {
    this.router.navigate([`/movie-update/${this.movie.id}`]);
  }

  onDelete() {
    this.moviesService.deleteMovie(this.movie.id);
  }
}
