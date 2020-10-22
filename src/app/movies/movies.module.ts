import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesComponent } from './movies.component';
import { HomeComponent } from './home/home.component';
import { AllMoviesComponent } from './all-movies/all-movies.component';
import { FavoriteMoviesComponent } from './favorite-movies/favorite-movies.component';
import { MovieItemComponent } from './movie-item/movie-item.component';
import { MoviesSearchComponent } from './movies-search/movies-search.component';

@NgModule({
  declarations: [
    MoviesComponent,
    HomeComponent,
    AllMoviesComponent,
    FavoriteMoviesComponent,
    MovieItemComponent,
    MoviesSearchComponent,
  ],
  imports: [CommonModule, MoviesRoutingModule],
})
export class MoviesModule {}
