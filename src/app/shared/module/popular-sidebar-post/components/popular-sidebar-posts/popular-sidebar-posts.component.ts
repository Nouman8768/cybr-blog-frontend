import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostSchema } from 'src/app/pages/Posts/post.schema';
import { PostService } from 'src/app/pages/Posts/post.service';

@Component({
  selector: 'app-popular-sidebar-posts',
  templateUrl: './popular-sidebar-posts.component.html',
  styleUrls: ['./popular-sidebar-posts.component.scss'],
})
export class PopularSidebarPostsComponent implements OnInit {
  constructor(
    private postService: PostService,
    private readonly route: Router
  ) {}

  confirmationState: boolean = true;
  sidebarPosts!: PostSchema[];

  async ngOnInit() {
    await this.getAllPosts();
    setTimeout(() => {
      const cPosts = document.querySelectorAll('.popullar-sidebar-posts');

      for (let i = 0; i < 5; i++) {
        const dots = document.querySelector(`.p-side-dots${i}`) as HTMLElement;

        const options = document.querySelector(
          `.p-side-options${i}`
        ) as HTMLElement;

        const deleteOptions = document.querySelector(
          `.p-side-delete${i}`
        ) as HTMLElement;

        const deleteConfirmation = document.querySelector(
          `.p-side-deleteOP${i}`
        ) as HTMLElement;

        const No = document.querySelector(`.p-side-No${i}`) as HTMLElement;

        dots?.addEventListener('click', () => {
          options!.classList.toggle('hidden');
          console.log(dots);
        });

        if (deleteOptions) {
          deleteOptions.addEventListener('click', () => {
            deleteConfirmation.style.display = 'flex';
          });
        }

        if (No) {
          No.addEventListener('click', () => {
            deleteConfirmation.style.display = 'none';
          });
        }
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
    this.route.navigate([`single-post/${details._id}`]);
  }

  async deletePost(id: string, filename: string) {
    const deleted = await this.postService.deletePost(id);
    const unlinked = await this.postService.unlinkServerImage(filename);
    this.getAllPosts();
    console.log(deleted);
  }
}
