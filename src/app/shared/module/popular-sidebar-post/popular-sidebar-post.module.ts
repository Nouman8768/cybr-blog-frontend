import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PopularSidebarPostRoutingModule } from './popular-sidebar-post-routing.module';
import { PopularSidebarPostComponent } from './popular-sidebar-post.component';
import { PopularSidebarPostsComponent } from './components/popular-sidebar-posts/popular-sidebar-posts.component';

@NgModule({
  declarations: [PopularSidebarPostComponent, PopularSidebarPostsComponent],
  imports: [CommonModule, PopularSidebarPostRoutingModule],
  exports: [PopularSidebarPostsComponent],
})
export class PopularSidebarPostModule {}
