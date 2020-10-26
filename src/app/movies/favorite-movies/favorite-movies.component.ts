import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MoviesService } from 'src/app/domain/movies.service';
import { Movie } from 'src/app/models/movie.model';

@Component({
  selector: 'app-favorite-movies',
  templateUrl: './favorite-movies.component.html',
  styleUrls: ['./favorite-movies.component.css']
})
export class FavoriteMoviesComponent implements OnInit {
  movies: Movie[] = [];
  subscription: Subscription;
  p: number = 1;

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.subscription = this.moviesService.getUserFavoriteMovies().subscribe(movies => {
      this.movies = movies;
      console.log(this.movies);
    })
    this.moviesService.favoriteMovies.subscribe(movies => {
      this.movies = movies
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
