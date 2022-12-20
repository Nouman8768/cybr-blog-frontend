import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserPostsRoutingModule } from './user-posts-routing.module';
import { UserPostsComponent } from './user-posts.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [UserPostsComponent],
  imports: [
    CommonModule,
    UserPostsRoutingModule,
    NgxPaginationModule,
    SharedModule,
  ],
})
export class UserPostsModule {}
