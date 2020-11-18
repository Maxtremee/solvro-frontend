import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css'],
})
export class MovieCardComponent implements OnInit {
  @Input() title: String;
  @Input() posterLink: String;
  @Input() description: String;
  @Input() badge: boolean;

  ngOnInit(): void {}
}
