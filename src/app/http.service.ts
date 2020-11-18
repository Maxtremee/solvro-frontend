import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Movie } from './movie.model';
import { UIService } from './ui.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private movieUrl = 'http://localhost:5000/movie';
  private movies: BehaviorSubject<Movie[]> = new BehaviorSubject<Movie[]>([]);

  constructor(
    private http: HttpClient,
    private uiService: UIService,
    private snackBar: MatSnackBar
  ) {}

  getMovieList(): BehaviorSubject<Movie[]> {
    return this.movies;
  }

  addMovieToList(movieId: String) {
    this.uiService.loadingStateChanged.next(true);
    let moviesCopy = this.movies.getValue();
    this.http
      .post<Movie>(this.movieUrl, { movie: movieId })
      .pipe(
        catchError((err) => {
          this.snackBar.open(
            'Nie można wczytać listy filmów. Spróbuj ponownie później'
          );
          return throwError(err);
        })
      )
      .subscribe((res: Movie) => {
        moviesCopy.push(res);
        this.uiService.loadingStateChanged.next(false);
        console.log(res.status);
      });
    this.movies.next(moviesCopy);
  }
}
