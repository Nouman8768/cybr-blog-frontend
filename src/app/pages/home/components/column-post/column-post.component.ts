import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostSchema } from 'src/app/pages/Posts/post.schema';
import { PostService } from 'src/app/pages/Posts/post.service';

@Component({
  selector: 'app-column-post',
  templateUrl: './column-post.component.html',
  styleUrls: ['./column-post.component.scss'],
})
export class ColumnPostComponent implements OnInit {
  constructor(
    private postService: PostService,
    private readonly route: Router
  ) {}

  options: boolean = false;
  columnPosts!: PostSchema[];

  ngOnInit() {
    this.postService.getPosts().subscribe((data: PostSchema[]) => {
      this.columnPosts = data.slice(0, 2);
    });

    setTimeout(() => {
      const cPosts = document.querySelectorAll('.column-post');

      for (let i = 0; i < cPosts.length; i++) {
        const dots = cPosts
          .item(i)
          .children.item(0)
          ?.childNodes.item(1) as HTMLElement;
        const options = cPosts
          .item(i)
          .children.item(0)
          ?.childNodes.item(2) as HTMLElement;

        const delteOPtions = cPosts
          .item(0)
          .children.item(0)
          ?.childNodes.item(3) as HTMLElement;

        const c = cPosts.item(0).children.item(0) as HTMLElement;

        dots?.addEventListener('click', () => {
          options.classList.toggle('hidden');
        });
      }
    }, 800);
  }

  async sendDetailstoUpdatePage(details: PostSchema) {
    this.postService.setter(details);
    this.route.navigate(['update-post']);
  }
}
