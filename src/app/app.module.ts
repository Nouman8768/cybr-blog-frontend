import { PopularSidebarPostModule } from './shared/module/popular-sidebar-post/popular-sidebar-post.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NavigationComponent } from './shared/components/navigation/navigation.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { SocialLinksComponent } from './shared/components/social-links/social-links.component';
import { HeaderPostComponent } from './shared/components/header-post/header-post.component';

import { HomeModule } from './pages/home/home.module';
import { CategoricallyPostsModule } from './pages/categorically-posts/categorically-posts.module';
import { FooterModule } from './shared/module/footer/footer.module';
import { AnonymousPostModule } from './shared/module/anonymous-post/anonymous-post.module';
@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HeaderComponent,
    SocialLinksComponent,

    HomeComponent,
    HeaderPostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    HomeModule,
    CategoricallyPostsModule,
    FooterModule,
    PopularSidebarPostModule,
    AnonymousPostModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
