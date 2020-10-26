import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { ApiPaths } from '../enums/api-paths';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  favoriteMovies = new BehaviorSubject<Movie[]>([]);
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getMovies(): Observable<Movie[]> {
    let url = `${this.baseUrl}/${ApiPaths.getAllMovies}`;
    return this.http.get<Movie[]>(url);
  }

  getMovie(id) {
    let url = `${this.baseUrl}/${ApiPaths.getMovieById}${id}`;
    return this.http.get<Movie>(url);
  }

  getUserFavoriteMovies(): Observable<Movie[]> {
    let url = `${this.baseUrl}/${ApiPaths.getUserFavoriteMovies}`;
    return this.http.get<Movie[]>(url);
  }

  addMovieToUserFavorites(movie:Movie) {
    let url = `${this.baseUrl}/${ApiPaths.addFavoriteMovie}`
    return this.http.post(url, {movieId: movie.id}).subscribe();
  }

  removeMovieFromUserFavorites(movieId) {
    console.log(movieId);
    let url = `${this.baseUrl}/${ApiPaths.removeFavoriteMovieByFavoriteId}${movieId}`
    return this.http.delete(url).subscribe(res => {
      this.getUserFavoriteMovies().subscribe(res => {
        this.favoriteMovies.next(res);
        console.log(res);
      });
    });
  }
}
