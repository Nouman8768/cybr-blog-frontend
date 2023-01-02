import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReadSinglePostRoutingModule } from './read-single-post-routing.module';
import { ReadSinglePostComponent } from './read-single-post.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ReadSinglePostComponent],
  imports: [CommonModule, ReadSinglePostRoutingModule, SharedModule],
})
export class ReadSinglePostModule {}
