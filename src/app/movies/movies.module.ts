import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesComponent } from './movies.component';
import { HomeComponent } from './home/home.component';
import { AllMoviesComponent } from './all-movies/all-movies.component';
import { FavoriteMoviesComponent } from './favorite-movies/favorite-movies.component';
import { MovieItemComponent } from './movie-item/movie-item.component';
import { MoviesSearchComponent } from './movies-search/movies-search.component';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from '../domain/interceptors/auth-interceptor.service';
import { LoggingInterceptorService } from '../domain/interceptors/logging-interceptor.service';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    MoviesComponent,
    HomeComponent,
    AllMoviesComponent,
    FavoriteMoviesComponent,
    MovieItemComponent,
    MoviesSearchComponent,
    HeaderComponent
  ],
  imports: [CommonModule, MoviesRoutingModule, NgxPaginationModule, SharedModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptorService, multi: true }
  ]
})
export class MoviesModule {}
