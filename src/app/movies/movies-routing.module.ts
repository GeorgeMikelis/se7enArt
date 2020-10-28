import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { AllMoviesComponent } from './all-movies/all-movies.component';
import { FavoriteMoviesComponent } from './favorite-movies/favorite-movies.component';
import { HomeComponent } from './home/home.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieUpdateComponent } from './movie-update/movie-update.component';
import { MoviesComponent } from './movies.component';

const routes: Routes = [
  {
    path: '',
    component: MoviesComponent,
    canActivate: [AuthGuard],
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
        path: 'movie-details/:id', component: MovieDetailsComponent
      },
      {
        path: 'movie-update/:id', component: MovieUpdateComponent
      },
      {
        path: 'movie-update/creation', component: MovieUpdateComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }
