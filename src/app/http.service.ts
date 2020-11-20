import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Movie } from './movie.model';
import { UIService } from './ui.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from './../environments/environment';
import { text } from '../assets/text.const';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private movieUrl = environment.movieUrl;
  private movies: BehaviorSubject<Movie[]> = new BehaviorSubject<Movie[]>([]);

  constructor(
    private http: HttpClient,
    private uiService: UIService,
    private snackBar: MatSnackBar
  ) {}

  get movieList(): BehaviorSubject<Movie[]> {
    return this.movies;
  }

  addMovieToList(movieId: String) {
    this.uiService.loadingStateChanged.next(true);
    const moviesCopy = [...this.movies.getValue()];
    this.http
      .post<Movie>(this.movieUrl, { movie: movieId })
      .pipe(
        catchError((err) => {
          this.snackBar.open(text.fetchMoviesErrorPL);
          return throwError(err);
        })
      )
      .subscribe((res: Movie) => {
        moviesCopy.push(res);
        this.movies.next(moviesCopy);

        this.uiService.loadingStateChanged.next(false);
        console.log(res.status);
      });
  }
}
