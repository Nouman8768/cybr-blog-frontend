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
import { SliderPostComponent } from './pages/home/components/slider/slider-post/slider-post.component';
import { SidebarSocialLinksComponent } from './pages/home/components/sidebar-social-links/sidebar-social-links.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
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
    SliderPostComponent,
    SidebarSocialLinksComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SwiperModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
