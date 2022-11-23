import { FooterModule } from './../../shared/module/footer/footer.module';
import { PopularSidebarPostModule } from './../../shared/module/popular-sidebar-post/popular-sidebar-post.module';
import { SidebarPostComponent } from './components/sidebar-post/sidebar-post.component';
import { AdBannerComponent } from './components/ad-banner/ad-banner.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { SectionLatestComponent } from './components/section-latest/section-latest.component';
import { SectionPopularComponent } from './components/section-popular/section-popular.component';
import { SectionHighlightedComponent } from './components/section-highlighted/section-highlighted.component';
import { SliderComponent } from './components/slider/slider.component';
import { ColumnPostComponent } from './components/column-post/column-post.component';
import { SidebarSocialLinksComponent } from './components/sidebar-social-links/sidebar-social-links.component';
import { SwiperModule } from 'swiper/angular';
import { BigPostComponent } from './components/section-popular/components/big-post/big-post.component';
import { AllPostsComponent } from './components/section-popular/components/all-posts/all-posts.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { HighlightedPostComponent } from './components/section-highlighted/components/highlighted-post/highlighted-post.component';
import { AnonymousPostModule } from 'src/app/shared/module/anonymous-post/anonymous-post.module';
@NgModule({
  declarations: [
    SidebarPostComponent,
    SliderComponent,
    ColumnPostComponent,
    SectionLatestComponent,
    SidebarSocialLinksComponent,
    SectionPopularComponent,
    AdBannerComponent,
    SectionHighlightedComponent,
    BigPostComponent,
    AllPostsComponent,
    HighlightedPostComponent,
  ],

  imports: [
    CommonModule,
    HomeRoutingModule,
    SwiperModule,
    NgxPaginationModule,
    PopularSidebarPostModule,
    AnonymousPostModule,
  ],
  exports: [
    SectionHighlightedComponent,
    SectionLatestComponent,
    SectionPopularComponent,
    AdBannerComponent,
  ],
})
export class HomeModule {}
