import { Component, Input, OnInit } from '@angular/core';
import { PostSchema } from 'src/app/pages/Posts/post.schema';
import { PostService } from 'src/app/pages/Posts/post.service';

@Component({
  selector: 'app-column-post',
  templateUrl: './column-post.component.html',
  styleUrls: ['./column-post.component.scss'],
})
export class ColumnPostComponent implements OnInit {
  options: boolean = false;
  constructor(private postService: PostService) {}

  columnPosts!: PostSchema[];

  async ngOnInit() {
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

        const c = cPosts.item(0).children.item(0) as HTMLElement;

        dots?.addEventListener('click', () => {
          console.log(options.classList.toggle('hidden'));
        });
      }
    }, 800);
  }
}
