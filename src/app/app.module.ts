import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CinemaHallComponent } from './forms/cinema-hall/cinema-hall.component';
import { SeatComponent } from './forms/cinema-hall/seat/seat.component';
import { MovieComponent } from './forms/movie/movie.component';
import { PersonalDataComponent } from './forms/personal-data/personal-data.component';
import { MovieCardComponent } from '../app/forms/movie/movie-card/movie-card.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TicketFormComponent } from './ticket-form/ticket-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import {
  MatSnackBarModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    TicketFormComponent,
    MovieCardComponent,
    PersonalDataComponent,
    MovieComponent,
    CinemaHallComponent,
    SeatComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    FlexLayoutModule,
    MatCardModule,
    MatRippleModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
    MatDividerModule,
    MatTooltipModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  exports: [
    MatToolbarModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    FlexLayoutModule,
    MatCardModule,
    MatRippleModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
    MatDividerModule,
    MatTooltipModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2000 } },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
