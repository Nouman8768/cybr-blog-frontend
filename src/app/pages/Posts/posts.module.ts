import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { CreateModule } from './create/create.module';
import { ReadSinglePostModule } from './read-single-post/read-single-post.module';
import { UpdateModule } from './update/update.module';
import { PostsComponent } from './posts.component';

@NgModule({
  declarations: [PostsComponent],
  imports: [
    CommonModule,
    PostsRoutingModule,
    CreateModule,
    ReadSinglePostModule,
    UpdateModule,
  ],
})
export class PostsModule {}
