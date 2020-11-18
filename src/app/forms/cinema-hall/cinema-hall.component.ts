import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Arrangement } from 'src/app/movie.model';

@Component({
  selector: 'app-cinema-hall',
  templateUrl: './cinema-hall.component.html',
  styleUrls: ['./cinema-hall.component.css'],
})
export class CinemaHallComponent implements OnInit {
  @Input() arrangement: Arrangement;
  @Output() ticketsEvent = new EventEmitter<FormArray>();
  @Output() ticketsValidEvent = new EventEmitter<boolean>();

  tickets: FormArray;

  rowA: number[];
  rowB: number[];
  rowX: number[];
  rows: String[] = ['C', 'D', 'E', 'F', 'G'];

  constructor(private formBuilder: FormBuilder) {
    this.tickets = new FormArray([]);
  }

  ngOnInit(): void {
    this.rowA = Array(7)
      .fill(0, 0, 7)
      .map((x, i) => i + 1);
    this.rowB = Array(8)
      .fill(0, 0, 8)
      .map((x, i) => i + 1);
    this.rowX = Array(9)
      .fill(0, 0, 9)
      .map((x, i) => i + 1);
  }

  ngOnDestroy() {}

  areTicketsValid() {
    this.tickets.length > 0
      ? this.ticketsValidEvent.emit(true)
      : this.ticketsValidEvent.emit(false);
  }
  manageTicket(row: string, seat: number) {
    //if seat occupied
    if (this.getState(row, seat) == 1) {
      return;
    }

    //if no tickets
    if (this.tickets.value.length == 0 || this.tickets.value === null) {
      this.tickets.push(this.createTicket(row, seat));
      this.setState(row, seat, 2);
      this.ticketsEvent.emit(this.tickets);
      return;
    }

    //check if seat already selected
    if (this.isSeatSelected(row, seat) === -1) {
      this.tickets.push(this.createTicket(row, seat));
      this.setState(row, seat, 2);
      this.ticketsEvent.emit(this.tickets);
    } else return;
  }

  isSeatSelected(row: string, seat: number) {
    let value = -1;
    this.tickets.value.forEach(
      (ticket: { row: string; seat: number }, index: number) => {
        if (ticket.row === row && ticket.seat === seat) {
          this.tickets.removeAt(index);
          this.setState(row, seat, 0);
          this.ticketsEvent.emit(this.tickets);
          value = index;
        }
      }
    );
    return value;
  }

  createTicket(row: string, seat: number): FormGroup {
    return this.formBuilder.group({
      row: [row, [Validators.required]],
      seat: [seat, [Validators.required]],
    });
  }

  getState(row: string, seat: number) {
    if (this.arrangement != null) {
      switch (row) {
        case 'A':
          return this.arrangement.A[seat - 1][seat];
        case 'B':
          return this.arrangement.B[seat - 1][seat];
        case 'C':
          return this.arrangement.C[seat - 1][seat];
        case 'D':
          return this.arrangement.D[seat - 1][seat];
        case 'E':
          return this.arrangement.E[seat - 1][seat];
        case 'F':
          return this.arrangement.F[seat - 1][seat];
        case 'G':
          return this.arrangement.G[seat - 1][seat];
      }
    } else return 0;
  }

  setState(row: string, seat: number, state: number) {
    // 0 - unoccupied, 1 - occupied, 2 - selected
    switch (row) {
      case 'A':
        this.arrangement.A[seat - 1][seat] = state;
        break;
      case 'B':
        this.arrangement.B[seat - 1][seat] = state;
        break;
      case 'C':
        this.arrangement.C[seat - 1][seat] = state;
        break;
      case 'D':
        this.arrangement.D[seat - 1][seat] = state;
        break;
      case 'E':
        this.arrangement.E[seat - 1][seat] = state;
        break;
      case 'F':
        this.arrangement.F[seat - 1][seat] = state;
        break;
      case 'G':
        this.arrangement.G[seat - 1][seat] = state;
        break;
    }
  }
}
