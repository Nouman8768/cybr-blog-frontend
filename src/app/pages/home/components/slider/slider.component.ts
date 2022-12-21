import { AuthService } from './../../../../shared/service/auth.service';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/shared/dto/post.schema';
import { PostService } from 'src/app/shared/service/post.service';
import SwiperCore, { Pagination, Navigation, SwiperOptions } from 'swiper';

SwiperCore.use([Pagination, Navigation]);

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SliderComponent implements OnInit {
  pagination = {
    clickable: true,
  };
  constructor(
    private readonly postsService: PostService,
    private readonly authService: AuthService,
    private readonly route: Router
  ) {}

  showdots: boolean = false;
  options: boolean = false;
  confirmationState: boolean = true;
  sliderPosts: Post[] = [];

  swiperConfig: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    grabCursor: true,
    loopFillGroupWithBlank: true,
    pagination: {
      clickable: true,
    },
    navigation: true,
    breakpoints: {
      1536: {
        slidesPerView: 3,
        spaceBetween: -80,
      },
      1280: {
        slidesPerView: 3,
        spaceBetween: -25,
      },
      1024: {
        slidesPerView: 2,
        spaceBetween: -80,
      },
    },
  };

  async ngOnInit() {
    await this.getAllPosts();

    this.showDots();

    setTimeout(() => {
      const cPosts = document.querySelectorAll('.slider-post');

      for (let i = 0; i < cPosts.length; i++) {
        const dots = document.querySelector(`.sdots${i}`) as HTMLElement;

        const options = document.querySelector(`.soptions${i}`) as HTMLElement;

        const deleteOptions = document.querySelector(
          `.sdelete${i}`
        ) as HTMLElement;

        const deleteConfirmation = document.querySelector(
          `.sdeleteOP${i}`
        ) as HTMLElement;

        const No = document.querySelector(`.sNo${i}`) as HTMLElement;

        dots?.addEventListener('click', () => {
          options!.classList.toggle('hidden');
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
    this.postsService.findAll().subscribe((data: Post[]) => {
      this.sliderPosts = data.reverse();
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
  async moveToCategoryPostPage(category: string) {
    this.route.navigate([`category-post/${category}`], {
      queryParams: { category: category },
    });
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
