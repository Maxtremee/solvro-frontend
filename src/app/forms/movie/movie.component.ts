import { Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import { UIService } from 'src/app/ui.service';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  NG_VALIDATORS,
} from '@angular/forms';
import { Subject, Subscription, pipe } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Movie } from 'src/app/movie.model';
import { text } from '../../../assets/text.const';

export interface MovieFormValues {
  movieTitle: String;
}

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MovieComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => MovieComponent),
      multi: true,
    },
  ],
})
export class MovieComponent implements ControlValueAccessor, OnDestroy, OnInit {
  @Input() movies: Movie[];

  form: FormGroup;
  isLoading = true;

  private subscription = new Subscription();
  private subsCutter$ = new Subject<void>();
  private loadingSubscription: Subscription;

  genericPoster = 'assets/poster.jpg';
  description = text.movieDesc;

  constructor(private formBuilder: FormBuilder, private uiService: UIService) {
    this.form = this.formBuilder.group({
      movieTitle: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.subscription.add(
      this.form.valueChanges
        .pipe(takeUntil(this.subsCutter$))
        .subscribe((value) => {
          this.onChange(value);
        })
    );

    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(
      (isLoading) => (this.isLoading = isLoading)
    );
  }

  ngOnDestroy() {
    this.subsCutter$.next();
    this.subsCutter$.unsubscribe();
    this.loadingSubscription.unsubscribe();
  }

  setMovieValue(title: String) {
    this.form.setValue({
      movieTitle: title,
    });
    this.onChange(title);
  }

  writeValue(value: MovieFormValues) {
    if (value) {
      this.value = value;
    }
    if (value === null) {
      this.form.reset();
    }
  }

  onChange: any = () => {};
  onTouched: any = () => {};

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  validate(_: FormControl) {
    return this.form.valid ? null : { movie: { valid: false } };
  }

  get value(): MovieFormValues {
    return this.form.value;
  }

  set value(value: MovieFormValues) {
    this.form.setValue(value);
    this.onChange(value);
  }

  get movieControl() {
    return this.form.controls.movieId;
  }
}
