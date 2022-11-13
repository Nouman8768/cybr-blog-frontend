import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-post',
  templateUrl: './header-post.component.html',
  styleUrls: ['./header-post.component.scss'],
})
export class HeaderPostComponent implements OnInit {
  constructor() {}

  options: boolean = false;

  ngOnInit(): void {}
}
