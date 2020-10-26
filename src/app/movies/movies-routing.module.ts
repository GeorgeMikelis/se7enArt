import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllMoviesComponent } from './all-movies/all-movies.component';
import { FavoriteMoviesComponent } from './favorite-movies/favorite-movies.component';
import { HomeComponent } from './home/home.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MoviesComponent } from './movies.component';

const routes: Routes = [
  {
    path: '',
    component: MoviesComponent,
    children: [
      {
        path: '', component: HomeComponent
      },
      {
        path: 'all-movies', component: AllMoviesComponent
      },
      {
        path: 'favorite-movies', component: FavoriteMoviesComponent
      },
      {
        path: 'movie-details', component: MovieDetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }
