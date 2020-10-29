import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CinemaHallComponent } from './cinema-hall.component';

describe('CinemaHallComponent', () => {
  let component: CinemaHallComponent;
  let fixture: ComponentFixture<CinemaHallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CinemaHallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CinemaHallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
