import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { MoviesService } from 'src/app/domain/movies.service';

import { Movie } from 'src/app/models/movie.model';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  subscritption: Subscription;
  movie$: Observable<Movie>

  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.getMovieById();
  }

  getMovieById() {
    const movieId = this.route.snapshot.queryParams['id'];
    console.log(movieId);
    this.movie$ = this.moviesService.getMovie(movieId);
    this.subscritption = this.movie$.subscribe();
  }

  ngOnDestroy() {
    this.subscritption.unsubscribe();
  }
}
