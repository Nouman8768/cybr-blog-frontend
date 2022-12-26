import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorPostsRoutingModule } from './author-posts-routing.module';
import { AuthorPostsComponent } from './author-posts.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [AuthorPostsComponent],
  imports: [
    CommonModule,
    AuthorPostsRoutingModule,
    SharedModule,
    NgxPaginationModule,
  ],
})
export class AuthorPostsModule {}
