import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReadSinglePostRoutingModule } from './read-single-post-routing.module';
import { ReadSinglePostComponent } from './read-single-post.component';
import { FooterModule } from 'src/app/shared/module/footer/footer.module';
import { AnonymousPostModule } from 'src/app/shared/module/anonymous-post/anonymous-post.module';
import { PopularSidebarPostModule } from 'src/app/shared/module/popular-sidebar-post/popular-sidebar-post.module';

@NgModule({
  declarations: [ReadSinglePostComponent],
  imports: [
    CommonModule,
    ReadSinglePostRoutingModule,
    PopularSidebarPostModule,
    AnonymousPostModule,
    FooterModule,
  ],
})
export class ReadSinglePostModule {}
