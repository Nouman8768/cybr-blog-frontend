import { Component, Input, OnInit } from '@angular/core';
import { PostSchema } from 'src/app/pages/Posts/post.schema';

@Component({
  selector: 'app-column-post',
  templateUrl: './column-post.component.html',
  styleUrls: ['./column-post.component.scss'],
})
export class ColumnPostComponent implements OnInit {
  options: boolean = false;
  constructor() {}

  @Input() result!: PostSchema[];
  ngOnInit(): void {}
}
