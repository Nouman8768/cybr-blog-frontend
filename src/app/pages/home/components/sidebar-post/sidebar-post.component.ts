import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostSchema } from 'src/app/pages/Posts/post.schema';
import { PostService } from 'src/app/pages/Posts/post.service';

@Component({
  selector: 'app-sidebar-post',
  templateUrl: './sidebar-post.component.html',
  styleUrls: ['./sidebar-post.component.scss'],
})
export class SidebarPostComponent implements OnInit {
  constructor(
    private postService: PostService,
    private readonly route: Router
  ) {}

  confirmationState: boolean = true;
  sidebarPosts!: PostSchema[];

  async ngOnInit() {
    await this.getAllPosts();
    setTimeout(() => {
      const cPosts = document.querySelectorAll('.sidebar-posts');

      for (let i = 0; i <= cPosts.length; i++) {
        const dots = document.querySelector(`.side-dots${i}`) as HTMLElement;

        const options = document.querySelector(
          `.side-options${i}`
        ) as HTMLElement;

        const deleteOptions = document.querySelector(
          `.side-delete${i}`
        ) as HTMLElement;

        const deleteConfirmation = document.querySelector(
          `.side-deleteOP${i}`
        ) as HTMLElement;

        const No = document.querySelector(`.side-No${i}`) as HTMLElement;

        dots?.addEventListener('click', () => {
          options!.classList.toggle('hidden');
          console.log(dots);
        });

        deleteOptions.addEventListener('click', () => {
          deleteConfirmation.style.display = 'flex';
        });

        No.addEventListener('click', () => {
          deleteConfirmation.style.display = 'none';
        });
      }
    }, 800);
  }

  async getAllPosts() {
    this.postService.getPosts().subscribe((data: PostSchema[]) => {
      this.sidebarPosts = data.slice(0, 4);
    });
  }
  async sendDetailstoUpdatePage(details: PostSchema) {
    this.postService.setter(details);
    this.route.navigate(['update-post']);
  }
  async populateSinglePostData(details: PostSchema) {
    this.postService.setter(details);
    this.route.navigate(['single-post']);
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
