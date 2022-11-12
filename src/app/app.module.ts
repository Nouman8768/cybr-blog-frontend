import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HeaderComponent } from './components/header/header.component';
import { SocialLinksComponent } from './components/social-links/social-links.component';
import { AddPostComponent } from './pages/add-post/add-post.component';
import { RecentBlogsComponent } from './components/recent-blogs/recent-blogs.component';
import { SidebarComponent } from './components/recent-blogs/components/sidebar/sidebar.component';
import { RecentPostsComponent } from './components/recent-blogs/components/recent-posts/recent-posts.component';
import { HomeComponent } from './pages/home/home.component';
import { PostColumnComponent } from './shared-components/post-column/post-column.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HeaderComponent,
    SocialLinksComponent,
    AddPostComponent,
    RecentBlogsComponent,
    RecentPostsComponent,
    SidebarComponent,
    HomeComponent,
    PostColumnComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
