import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostSchema } from 'src/app/pages/Posts/post.schema';
import { PostService } from 'src/app/pages/Posts/post.service';

@Component({
  selector: 'app-big-post',
  templateUrl: './big-post.component.html',
  styleUrls: ['./big-post.component.scss'],
})
export class BigPostComponent implements OnInit {
  constructor(
    private postService: PostService,
    private readonly route: Router
  ) {}

  confirmationState: boolean = true;
  highlightedPosts!: PostSchema[];

  async ngOnInit() {
    await this.getAllPosts();
    setTimeout(() => {
      const b_posts = document.querySelectorAll('.big-post');

      const dots = document.querySelector('.b-dots') as HTMLElement;

      const options = document.querySelector('.b-options') as HTMLElement;

      const deleteOptions = document.querySelector('.b-delete') as HTMLElement;

      const deleteConfirmation = document.querySelector(
        '.b-confirmation'
      ) as HTMLElement;

      const No = document.querySelector('.b-No') as HTMLElement;

      dots?.addEventListener('click', () => {
        options!.classList.toggle('hidden');
      });

      deleteOptions.addEventListener('click', () => {
        deleteConfirmation.style.display = 'flex';
      });

      No.addEventListener('click', () => {
        deleteConfirmation.style.display = 'none';
      });
    }, 800);
  }

  async getAllPosts() {
    this.postService.getPosts().subscribe((data: PostSchema[]) => {
      this.highlightedPosts = data.slice(3, 4);
    });
  }
  async sendDetailstoUpdatePage(details: PostSchema) {
    this.postService.setter(details);
    this.route.navigate(['update-post']);
  }
  async sendCategory(category: PostSchema) {
    this.postService.setter(category);
    this.route.navigate(['category-post']);
  }

  async deletePost(id: string, filename: string) {
    const deleted = await this.postService.deletePost(id);
    const unlinked = await this.postService.unlinkServerImage(filename);
    this.getAllPosts();
    console.log(deleted);
  }
}
