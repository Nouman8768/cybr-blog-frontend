import { FooterModule } from '../../shared/module/footer/footer.module';
import { PopularSidebarPostModule } from '../../shared/module/popular-sidebar-post/popular-sidebar-post.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoricallyPostsRoutingModule } from './categorically-posts-routing.module';
import { CategoricallyPostsComponent } from './categorically-posts.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AnonymousPostModule } from '../../shared/module/anonymous-post/anonymous-post.module';

@NgModule({
  declarations: [CategoricallyPostsComponent],
  imports: [
    CommonModule,
    CategoricallyPostsRoutingModule,
    NgxPaginationModule,
    PopularSidebarPostModule,
    FooterModule,
    AnonymousPostModule,
  ],
})
export class CategoricallyPostsModule {}
