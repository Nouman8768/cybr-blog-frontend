import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/shared/post.schema';
import { PostService } from 'src/app/shared/post.service';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.scss'],
})
export class AllPostsComponent implements OnInit {
  constructor(
    private readonly service: PostService,
    private readonly route: Router
  ) {}

  confirmationState: boolean = true;
  allPosts: Post[] = [];
  page: number = 1;

  async ngOnInit(): Promise<void> {
    await this.getAllPosts();
    setTimeout(() => {
      for (let i = 0; i < this.allPosts.length; i++) {
        const dots = document.querySelector(
          `.all-posts-dots${i}`
        ) as HTMLElement;

        const options = document.querySelector(
          `.all-posts-options${i}`
        ) as HTMLElement;

        const deleteOptions = document.querySelector(
          `.all-posts-delete${i}`
        ) as HTMLElement;

        const deleteConfirmation = document.querySelector(
          `.all-posts-confirmation${i}`
        ) as HTMLElement;

        const No = document.querySelector(`.all-posts-No${i}`) as HTMLElement;

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
    this.service.findAll().subscribe((data: Post[]) => {
      this.allPosts = data.reverse();
    });
  }
  async moveToUpdatePage(id: string) {
    this.route.navigate([`update/${id}`], {
      queryParams: { id: id },
    });
  }
  async moveToSinglePostPage(id: string) {
    this.route.navigate([`single-post/${id}`], {
      queryParams: { id: id },
    });
  }
  async moveToCategoryPostPage(category: string) {
    this.route.navigate([`category-post/${category}`], {
      queryParams: { category: category },
    });
  }

  async deletePost(id: string, filename: string) {
    const deleted = await this.service.delete(id);
    const unlinked = await this.service.unlinkImagefromServer(filename);
    this.getAllPosts();
  }
}
