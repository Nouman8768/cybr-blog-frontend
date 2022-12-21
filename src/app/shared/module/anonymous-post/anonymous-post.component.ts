import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/shared/dto/post.schema';
import { AuthService } from '../../service/auth.service';
import { PostService } from '../../service/post.service';

@Component({
  selector: 'app-anonymous-post',
  templateUrl: './anonymous-post.component.html',
  styleUrls: ['./anonymous-post.component.scss'],
})
export class AnonymousPostComponent implements OnInit {
  constructor(
    private readonly postsService: PostService,
    private readonly authService: AuthService,
    private readonly route: Router
  ) {}

  showdots: boolean = false;

  confirmationState: boolean = true;
  anonymousPosts: Post[] = [];

  async ngOnInit() {
    await this.getAllPosts();

    this.showDots();

    setTimeout(() => {
      const dots = document.querySelector('.a-dots') as HTMLElement;

      const options = document.querySelector('.a-options') as HTMLElement;

      const deleteOptions = document.querySelector('.a-delete') as HTMLElement;

      const deleteConfirmation = document.querySelector(
        '.a-confirmation'
      ) as HTMLElement;

      const No = document.querySelector('.a-No') as HTMLElement;

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

  getAllPosts() {
    this.postsService.findAll().subscribe((data: Post[]) => {
      this.anonymousPosts = data.slice(2, 3);
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
