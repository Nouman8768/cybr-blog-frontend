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

@NgModule({
  declarations: [SharedComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FooterModule,
    AnonymousPostModule,
    PopularSidebarPostModule,
  ],
  exports: [
    FooterComponent,
    AnonymousPostComponent,
    PopularSidebarPostComponent,
  ],
})
export class SharedModule {}
