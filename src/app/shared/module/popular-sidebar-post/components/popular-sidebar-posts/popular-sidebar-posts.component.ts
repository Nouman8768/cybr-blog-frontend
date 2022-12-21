import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/pages/authentication/login/login.component';
import { Post } from 'src/app/shared/dto/post.schema';
import { AuthService } from 'src/app/shared/service/auth.service';
import { PostService } from 'src/app/shared/service/post.service';

@Component({
  selector: 'app-popular-sidebar-posts',
  templateUrl: './popular-sidebar-posts.component.html',
  styleUrls: ['./popular-sidebar-posts.component.scss'],
})
export class PopularSidebarPostsComponent implements OnInit {
  constructor(
    private readonly postsService: PostService,
    private readonly authService: AuthService,
    private readonly route: Router
  ) {}

  showdots: boolean = false;
  confirmationState: boolean = true;
  sidebarPosts: Post[] = [];

  async ngOnInit() {
    await this.getAllPosts();

    this.showDots();

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

  getAllPosts() {
    this.postsService.findAll().subscribe((data: Post[]) => {
      this.sidebarPosts = data.slice(0, 4);
    });
  }
  async sendDetailstoUpdatePage(details: Post) {
    this.route.navigate([`posts/update/${details._id}`]);
  }
  async populateSinglePostData(details: Post) {
    this.route.navigate([`posts/single-post/${details._id}`]);
  }

  async deletePost(id: string, filename: string) {
    const deleted = await this.postsService.delete(id);
    const unlinked = await this.postsService.unlinkImagefromServer(filename);
    this.getAllPosts();
  }

  showDots() {
    if (this.authService.tokenNotExpired()) {
      this.showdots = true;
    } else {
      this.showdots;
    }
  }
}
