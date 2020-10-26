import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { MoviesModule } from './movies/movies.module';
import { AuthInterceptorService } from './domain/interceptors/auth-interceptor.service';
import { LoggingInterceptorService } from './domain/interceptors/logging-interceptor.service';
import { CachingInterceptor } from './domain/interceptors/caching-interceptor.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    MoviesModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
