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
  behevSubMoviesSub: Subscription;
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
    this.behevSubMoviesSub = this.moviesService.movies.subscribe(movies => {
      this.movies = movies;
    })
    this.favoriteMoviesSub = this.moviesService.getUserFavoriteMovies().subscribe(movies => {
      this.favoriteMovies = movies;
      console.log(this.favoriteMovies);
    })
    this.behevSubFavMovSub = this.moviesService.favoriteMovies.subscribe(movies => {
      this.favoriteMovies = movies;
    })
    console.log(this.movies);
  }

  ngOnDestroy(): void {
    this.moviesSubscription.unsubscribe();
    this.behevSubMoviesSub.unsubscribe();
    this.favoriteMoviesSub.unsubscribe();
    this.behevSubFavMovSub.unsubscribe();
  }

  isFavorite(id): boolean {
    if (this.favoriteMovies.map(movie => movie.id).includes(id)) {
      this.movies.find(movie => movie.id === id).favoriteId = this.favoriteMovies.find(movie => movie.id === id).favoriteId;
      return true;
    } else {
      return false;
    }

  }
}
