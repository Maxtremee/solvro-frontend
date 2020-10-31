import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { HttpService } from '../http.service';
import { Arrangement, Movie } from '../movie.model';

@Component({
  selector: 'app-ticket-form',
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.css'],
})
export class TicketFormComponent implements OnInit, OnDestroy {
  movies: Movie[];
  movieSub$: Subscription;
  form: FormGroup;
  ticketsValid: boolean;
  step = 0;
  sessions = [];
  arrangement: Arrangement;
  discounts = [
    { name: 'brak', value: 1 },
    {
      name: 'studencka (30%)',
      value: 0.7,
    },
    { name: 'emeryt (50%)', value: 0.5 },
  ];
  price = 20;

  constructor(
    private formBuilder: FormBuilder,
    private api: HttpService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      movieChosen: [],
      session: ['', [Validators.required]],
      tickets: [],
      discount: ['', [Validators.required]],
      personalData: [],
    });

    this.movieSub$ = this.api.getMovieList().subscribe((movies) => {
      this.movies = movies;
    });
    this.api.addMovieToList('78483421');
  }

  ngOnDestroy(): void {
    this.movieSub$.unsubscribe();
  }

  format_time(timestamp: number) {
    return new Date(timestamp * 1e3).toISOString().slice(-13, -5);
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  getSumToPay(): number {
    if (this.ticketsValid && this.discount.valid)
      return this.tickets.length * this.price * this.discount.value.value;
    if (this.ticketsValid) return this.tickets.length * this.price;
    else return 0;
  }

  makeReservation() {
    this.snackBar.open('Dokonano rezerwacji!', 'Zamknij');
    console.log(this.form);
  }

  pay() {
    this.snackBar.open('Zapłacono!', 'Zamknij');
    console.log(this.form);
  }

  setSessions() {
    this.sessions = this.movies.find(
      (movie) => movie.title === this.movieChosen.value
    ).sessions;
  }

  setArrangement() {
    this.arrangement = this.movies.find(
      (movie) => movie.title === this.movieChosen.value
    ).arrangement;
  }

  get movieChosen() {
    return this.form.get('movieChosen');
  }

  get session() {
    return this.form.get('session');
  }

  get tickets() {
    return this.form.get('tickets').value;
  }

  get discount() {
    return this.form.get('discount');
  }

  get personalData() {
    return this.form.get('personalData');
  }

  set tickets(array: FormArray) {
    this.form.get('tickets').setValue(array);
  }
}
