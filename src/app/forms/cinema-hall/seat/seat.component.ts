import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-seat',
  templateUrl: './seat.component.html',
  styleUrls: ['./seat.component.css'],
})
export class SeatComponent implements OnInit, OnChanges {
  @Input() state: number;
  @Input() row: string;
  @Input() seat: number;

  constructor() {}

  ngOnInit(): void {
    this.setColour();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.setColour();
  }

  setColour() {
    switch (this.state) {
      case 0:
        return { 'background-color': '#09AF00' };
      case 1:
        return { 'background-color': '#B00020' };
      case 2:
        return { 'background-color': '#FFDE03' };
    }
  }
}
