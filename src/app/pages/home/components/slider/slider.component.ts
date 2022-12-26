import { AuthService } from './../../../../shared/service/auth.service';
import {
  Component,
  ViewEncapsulation,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/shared/dto/post.schema';
import { PostService } from 'src/app/shared/service/post.service';
import SwiperCore, { Pagination, Navigation, SwiperOptions } from 'swiper';
import { SharedFunctionsService } from 'src/app/shared/service/shared-functions.service';

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
    private readonly sahredFuncService: SharedFunctionsService,
    private readonly route: Router
  ) {}

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
  }

  async getAllPosts() {
    this.postsService.findAll().subscribe((data: Post[]) => {
      console.log('Author', data[49].author.firstname);
      this.sliderPosts = data.reverse();
    });
  }

  async moveToSinglePostPage(id: string) {
    this.route.navigate([`single-post/${id}`], {
      queryParams: { id: id },
    });
  }

  async moveToAuthorPostsPage(author: string) {
    this.route.navigate([`author-posts/${author}`], {
      queryParams: { author: author },
    });
  }

  async moveToCategoryPostPage(category: string) {
    this.route.navigate([`category-post/${category}`], {
      queryParams: { category: category },
    });
  }
}
