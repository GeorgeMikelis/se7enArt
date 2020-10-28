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
  movies = new BehaviorSubject<Movie[]>([]);
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getMovies(title?: string): Observable<Movie[]> {
    let url = `${this.baseUrl}/${ApiPaths.getAllMovies}`;
    if (title) {
      return this.http.get<Movie[]>(url, {
        params: {
          title: title
        }
      }).pipe(
        tap((res) => {
          this.movies.next(res);
        })
      );
    } else {
      return this.http.get<Movie[]>(url).pipe(
        tap((res) => {
          this.movies.next(res);
        })
      );
    }
  }

  getMovie(id) {
    let url = `${this.baseUrl}/${ApiPaths.getMovieById}${id}`;
    return this.http.get<Movie>(url);
  }

  updateMovie(id, title, description, dateReleased) {
    let url = `${this.baseUrl}/${ApiPaths.updateMovieById}${id}`;
    let body = {
      title: title,
      description: description,
      dateReleased: dateReleased
    };
    return this.http.put(url, body).subscribe(res => {
      console.log(res)
    });
  }

  deleteMovie(id) {
    let url = `${this.baseUrl}/${ApiPaths.updateMovieById}${id}`;
    return this.http.delete(url).subscribe((res) => {
      this.getMovies().subscribe();
    });
  }

  getUserFavoriteMovies(title?: string): Observable<Movie[]> {
    let url = `${this.baseUrl}/${ApiPaths.getUserFavoriteMovies}`;
    if (title) {
      return this.http.get<Movie[]>(url, {
        params: {
          title: title
        }
      }).pipe(
        tap((res) => {
          this.favoriteMovies.next(res);
          console.log(`REMOVE${res}`);
        })
      );
    } else {
      return this.http.get<Movie[]>(url).pipe(
        tap((res) => {
          this.favoriteMovies.next(res);
          console.log(`REMOVE${res}`);
        })
      );
    }
  }

  addMovieToUserFavorites(movie: Movie) {
    let url = `${this.baseUrl}/${ApiPaths.addFavoriteMovie}`;
    return this.http.post<
    {
      id: string,
      movieId: string,
      userId: string
    }>(url, { movieId: movie.id });
  }

  removeMovieFromUserFavorites(movieId) {
    console.log(movieId);
    let url = `${this.baseUrl}/${ApiPaths.removeFavoriteMovieByFavoriteId}${movieId}`;
    return this.http.delete(url).subscribe((res) => {
      this.getUserFavoriteMovies().subscribe();
    });
  }
}
