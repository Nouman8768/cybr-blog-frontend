import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  constructor() {}

  @Input() icon!: string;
  @Input() title!: string;
  @Input() number!: string;
  @Input() label!: string;

  ngOnInit(): void {}
}
