import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FooterRoutingModule } from './footer-routing.module';
import { FooterComponent } from './footer.component';
import { LatestPostsComponent } from './components/latest-posts/latest-posts.component';

@NgModule({
  declarations: [FooterComponent, LatestPostsComponent],
  imports: [CommonModule, FooterRoutingModule],
  exports: [FooterComponent, LatestPostsComponent],
})
export class FooterModule {}
