import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoricallyPostsRoutingModule } from './categorically-posts-routing.module';
import { CategoricallyPostsComponent } from './categorically-posts.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [CategoricallyPostsComponent],
  imports: [
    CommonModule,
    CategoricallyPostsRoutingModule,
    NgxPaginationModule,
    SharedModule,
  ],
})
export class CategoricallyPostsModule {}
