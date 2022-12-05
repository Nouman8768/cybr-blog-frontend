import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { FooterModule } from './module/footer/footer.module';
import { FooterComponent } from './module/footer/footer.component';
import { AnonymousPostModule } from './module/anonymous-post/anonymous-post.module';
import { PopularSidebarPostModule } from './module/popular-sidebar-post/popular-sidebar-post.module';
import { AnonymousPostComponent } from './module/anonymous-post/anonymous-post.component';
import { PopularSidebarPostComponent } from './module/popular-sidebar-post/popular-sidebar-post.component';
import { HeaderComponent } from './components/header/header.component';
import { HeaderPostComponent } from './components/header-post/header-post.component';
import { SocialLinksComponent } from './components/social-links/social-links.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    SharedComponent,
    HeaderComponent,
    HeaderPostComponent,
    NavigationComponent,
    SocialLinksComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FooterModule,
    AnonymousPostModule,
    PopularSidebarPostModule,
    HttpClientModule,
  ],
  exports: [
    FooterComponent,
    AnonymousPostComponent,
    PopularSidebarPostComponent,
    HeaderComponent,
    HeaderPostComponent,
    SocialLinksComponent,
    NavigationComponent,
  ],
})
export class SharedModule {}
