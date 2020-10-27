import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MoviesService } from 'src/app/domain/movies.service';
import { Movie } from 'src/app/models/movie.model';

@Component({
  selector: 'app-all-movies',
  templateUrl: './all-movies.component.html',
  styleUrls: ['./all-movies.component.css']
})
export class AllMoviesComponent implements OnInit, OnDestroy {
  movies: Movie[];
  moviesSubscription: Subscription;
  favoriteMovies: Movie[];
  favoriteMoviesSub: Subscription;
  behevSubFavMovSub: Subscription;

  p: number = 1;

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.moviesSubscription = this.moviesService.getMovies().subscribe(movies => {
      this.movies = movies;
      console.log(this.movies);
    })
    this.favoriteMoviesSub = this.moviesService.getUserFavoriteMovies().subscribe(movies => {
      this.favoriteMovies = movies;
      console.log(this.favoriteMovies);
    })
    this.behevSubFavMovSub = this.moviesService.favoriteMovies.subscribe(movies => {
      this.favoriteMovies = movies;
    })

    for (let i; i < this.movies.length; i++) {
      for (let j; j < this.favoriteMovies.length; j++) {
        if (this.movies[i].id === this.favoriteMovies[j].id) {
          this.movies[i].favoriteId = this.favoriteMovies[j].favoriteId;
        }
      }
    }
    console.log(this.movies);
  }

  ngOnDestroy(): void {
    this.moviesSubscription.unsubscribe();
    this.favoriteMoviesSub.unsubscribe();
    this.behevSubFavMovSub.unsubscribe();
  }
}
