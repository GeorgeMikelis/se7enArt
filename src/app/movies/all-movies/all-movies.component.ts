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
  subscription: Subscription;
  p: number = 1;

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.subscription = this.moviesService.getMovies().subscribe(movies => {
      this.movies = movies;
      console.log(this.movies);
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
