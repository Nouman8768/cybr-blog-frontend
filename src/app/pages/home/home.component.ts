import { Component, OnInit } from '@angular/core';
import { PostSchema } from '../Posts/post.schema';
import { PostService } from '../Posts/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
