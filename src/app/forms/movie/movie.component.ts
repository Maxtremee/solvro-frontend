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
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/movie.model';

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
  form: FormGroup;
  subscriptions: Subscription[] = [];
  isLoading = true;
  private loadingSubscription: Subscription;

  @Input() movies: Movie[];

  genericPoster =
    'https://s.studiobinder.com/wp-content/uploads/2017/12/Movie-Poster-Template-Dark-with-Image.jpg?x81279';
  description =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rhoncus auctor nunc ac semper. Proin id fringilla metus. Nam vestibulum, risus ut dapibus dapibus, sem ante accumsan turpis, ut auctor nulla sapien scelerisque enim. Phasellus ornare rutrum ex, sit amet aliquet velit ornare et. Donec et sem vitae nisi facilisis hendrerit. Curabitur sagittis justo a accumsan auctor. Sed et ornare sem. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.';

  constructor(private formBuilder: FormBuilder, private uiService: UIService) {
    this.form = this.formBuilder.group({
      movieTitle: ['', Validators.required],
    });

    this.subscriptions.push(
      this.form.valueChanges.subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  ngOnInit() {
    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(
      (isLoading) => (this.isLoading = isLoading)
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
    this.loadingSubscription.unsubscribe();
  }

  setMovieValue(title: String) {
    this.form.setValue({
      movieTitle: title,
    });
    this.onChange(title);
    this.onTouched();
  }

  get value(): MovieFormValues {
    return this.form.value;
  }

  set value(value: MovieFormValues) {
    this.form.setValue(value);
    this.onChange(value);
    this.onTouched();
  }

  get movieControl() {
    return this.form.controls.movieId;
  }

  onChange: any = () => {};
  onTouched: any = () => {};

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  writeValue(value: MovieFormValues) {
    if (value) {
      this.value = value;
    }

    if (value === null) {
      this.form.reset();
    }
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  validate(_: FormControl) {
    return this.form.valid ? null : { movie: { valid: false } };
  }
}
