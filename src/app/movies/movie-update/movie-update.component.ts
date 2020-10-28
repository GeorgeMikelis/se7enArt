import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { MoviesService } from 'src/app/domain/movies.service';
import { Movie } from 'src/app/models/movie.model';

@Component({
  selector: 'app-movie-update',
  templateUrl: './movie-update.component.html',
  styleUrls: ['./movie-update.component.css']
})
export class MovieUpdateComponent implements OnInit, OnDestroy {
  subscritption: Subscription;
  movie$: Observable<Movie>;
  movie: Movie;

  currentUrl: string;

  newMovie: boolean;

  movieForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    dateReleased: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  get title() {
    return this.movieForm.get('title');
  }
  get dateReleased() {
    return this.movieForm.get('dateReleased');
  }
  get description() {
    return this.movieForm.get('description');
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.currentUrl = this.router.url;

    if (this.currentUrl !== '/movie-update/creation') {
      this.getMovieById();
    } else {
      this.newMovie = true;
    }
    console.log(this.newMovie);
  }

  getMovieById() {
    const movieId = this.route.snapshot.params['id'];
    console.log(movieId);
    this.movie$ = this.moviesService.getMovie(movieId);
    this.subscritption = this.movie$.subscribe(movie => {
      this.movie = movie;

      this.movieForm.patchValue({
        dateReleased: this.movie.dateReleased,
        description: this.movie.description
      });

      console.log(this.movie)
    });
  }

  onSubmit() {
    let title = this.movieForm.value.title;
    let description = this.movieForm.value.description;
    let dateReleased = this.movieForm.value.dateReleased;

    console.log(this.movieForm.value)

    this.moviesService.updateMovie(this.movie.id, title, description, dateReleased);
    this.router.navigate(['/all-movies']);
  }

  ngOnDestroy() {
    if (this.currentUrl !== '/movie-update/creation') {
      this.subscritption.unsubscribe();
    } else {
      return;
    }
  }
}
