import { Component, forwardRef, OnDestroy } from '@angular/core';
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

export interface PersonalDataValues {
  firstName: String;
  lastName: String;
  email: String;
  phoneNumber: String;
}

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PersonalDataComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PersonalDataComponent),
      multi: true,
    },
  ],
})
export class PersonalDataComponent implements ControlValueAccessor, OnDestroy {
  form: FormGroup;
  private subscriptions = new Subscription();

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', [Validators.required]],
    });

    this.subscriptions.add(
      this.form.valueChanges.subscribe((value) => {
        this.onChange(value);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  get value(): PersonalDataValues {
    return this.form.value;
  }

  set value(value: PersonalDataValues) {
    this.form.setValue(value);
    this.onChange(value);
  }

  get emailControl() {
    return this.form.controls.email;
  }

  get firstNameControl() {
    return this.form.controls.firstName;
  }

  get lastNameControl() {
    return this.form.controls.lastName;
  }

  get phoneNumberControl() {
    return this.form.controls.phoneNumber;
  }

  onChange: any = () => {};
  onTouched: any = () => {};

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  writeValue(value: PersonalDataValues) {
    if (value) {
      this.value = value;
    }
    if (value === null) {
      this.form.reset();
    }
  }

  validate(_: FormControl) {
    return this.form.valid ? null : { data: { valid: false } };
  }
}
