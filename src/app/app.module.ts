import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HeaderComponent } from './components/header/header.component';
import { SocialLinksComponent } from './components/social-links/social-links.component';
import { AddPostComponent } from './pages/Posts/add-post/add-post.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderPostComponent } from './components/header-post/header-post.component';
import { SidebarPostComponent } from './pages/home/components/sidebar-post/sidebar-post.component';
import { SliderComponent } from './pages/home/components/slider/slider.component';
import { ColumnPostComponent } from './pages/home/components/column-post/column-post.component';
import { SectionLatestComponent } from './pages/home/components/section-latest/section-latest.component';
import { SwiperModule } from 'swiper/angular';

import { SidebarSocialLinksComponent } from './pages/home/components/sidebar-social-links/sidebar-social-links.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdatePostComponent } from './pages/Posts/update-post/update-post.component';
import { SectionPopularComponent } from './pages/home/components/section-popular/section-popular.component';
import { AdBannerComponent } from './pages/home/components/ad-banner/ad-banner.component';
import { BigPostComponent } from './pages/home/components/section-popular/components/big-post/big-post.component';
import { AllPostsComponent } from './pages/home/components/section-popular/components/all-posts/all-posts.component';
import { AnonymousPostComponent } from './pages/home/components/section-popular/components/anonymous-post/anonymous-post.component';
import { SectionHighlightedComponent } from './pages/home/components/section-highlighted/section-highlighted.component';
import { HighlightedPostComponent } from './pages/home/components/section-highlighted/components/highlighted-post/highlighted-post.component';
import { PopularSidebarPostsComponent } from './pages/home/components/section-popular/components/popular-sidebar-posts/popular-sidebar-posts.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { LatestPostsComponent } from './components/footer/components/latest-posts/latest-posts.component';
SinglePostComponent;
import { CategoricallyPostsComponent } from './pages/categorically-posts/categorically-posts.component';
import { SinglePostComponent } from './pages/single-post/single-post.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HeaderComponent,
    SocialLinksComponent,
    AddPostComponent,
    HomeComponent,
    HeaderPostComponent,
    SidebarPostComponent,
    SliderComponent,
    ColumnPostComponent,
    SectionLatestComponent,
    SidebarSocialLinksComponent,
    UpdatePostComponent,
    SectionPopularComponent,
    AdBannerComponent,
    BigPostComponent,
    AllPostsComponent,
    AnonymousPostComponent,
    SectionHighlightedComponent,
    HighlightedPostComponent,
    PopularSidebarPostsComponent,
    FooterComponent,
    LatestPostsComponent,
    SinglePostComponent,
    CategoricallyPostsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SwiperModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
