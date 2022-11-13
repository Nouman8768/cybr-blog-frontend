import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-post',
  templateUrl: './sidebar-post.component.html',
  styleUrls: ['./sidebar-post.component.scss'],
})
export class SidebarPostComponent implements OnInit {
  options: boolean = false;
  constructor() {}

  ngOnInit(): void {}
}
