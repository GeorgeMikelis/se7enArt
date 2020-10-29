import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MoviesService } from 'src/app/domain/movies.service';
import { Movie } from 'src/app/models/movie.model';

@Component({
  selector: 'app-all-movies',
  templateUrl: './all-movies.component.html',
  styleUrls: ['./all-movies.component.css'],
})
export class AllMoviesComponent implements OnInit, OnDestroy {
  movies: Movie[];
  moviesSubscription: Subscription;
  behevSubMoviesSub: Subscription;
  favoriteMovies: Movie[];
  favoriteMoviesSub: Subscription;
  behevSubFavMovSub: Subscription;

  searchHappened: boolean = false;

  p: number = 1;

  constructor(private moviesService: MoviesService, private router: Router) {}

  ngOnInit(): void {
    this.moviesSubscription = this.moviesService
      .getMovies()
      .subscribe((movies) => {
        this.movies = movies;
        console.log(this.movies);
      });
    this.behevSubMoviesSub = this.moviesService.movies.subscribe((movies) => {
      this.movies = movies;
    });
    this.favoriteMoviesSub = this.moviesService
      .getUserFavoriteMovies()
      .subscribe((movies) => {
        this.favoriteMovies = movies;
        console.log(this.favoriteMovies);
      });
    this.behevSubFavMovSub = this.moviesService.favoriteMovies.subscribe(
      (movies) => {
        this.favoriteMovies = movies;
      }
    );
    console.log(this.movies);
  }

  isFavorite(id): boolean {
    if (this.favoriteMovies.map((movie) => movie.id).includes(id)) {
      this.movies.find(
        (movie) => movie.id === id
      ).favoriteId = this.favoriteMovies.find(
        (movie) => movie.id === id
      ).favoriteId;
      return true;
    } else {
      return false;
    }
  }

  search(movieTitle: string) {
    if (movieTitle.trim() === '') {
      this.searchHappened = false;
    } else {
      this.searchHappened = true;
    }
    console.log(movieTitle);
    this.moviesService.getMovies(movieTitle.trim()).subscribe((res) => {
      console.log(res);
    });
  }

  onCreate() {
    this.router.navigate(['movie-update/creation'])
  }

  ngOnDestroy(): void {
    this.moviesSubscription.unsubscribe();
    this.behevSubMoviesSub.unsubscribe();
    this.favoriteMoviesSub.unsubscribe();
    this.behevSubFavMovSub.unsubscribe();
  }
}
