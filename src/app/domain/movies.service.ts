import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ApiPaths } from '../enums/api-paths';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
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

  manageFavorites(movie:Movie) {
    console.log(movie);
  }
}
