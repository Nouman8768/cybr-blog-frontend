import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/shared/dto/post.schema';
import { PostService } from 'src/app/shared/service/post.service';

@Component({
  selector: 'app-sidebar-post',
  templateUrl: './sidebar-post.component.html',
  styleUrls: ['./sidebar-post.component.scss'],
})
export class SidebarPostComponent implements OnInit {
  constructor(
    private readonly service: PostService,
    private readonly route: Router
  ) {}

  confirmationState: boolean = true;
  sidebarPosts: Post[] = [];

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
    this.service.findAll().subscribe((data: Post[]) => {
      this.sidebarPosts = data.slice(2, 6);
    });
  }
  async moveToUpdatePage(id: string) {
    this.route.navigate([`posts/update/${id}`], {
      queryParams: { id: id },
    });
  }
  async moveToSinglePostPage(id: string) {
    this.route.navigate([`posts/single-post/${id}`], {
      queryParams: { id: id },
    });
  }

  async deletePost(id: string, filename: string) {
    const deleted = await this.service.delete(id);
    const unlinked = await this.service.unlinkImagefromServer(filename);
    this.getAllPosts();
  }
}
