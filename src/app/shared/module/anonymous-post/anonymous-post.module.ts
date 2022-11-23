import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnonymousPostRoutingModule } from './anonymous-post-routing.module';
import { AnonymousPostComponent } from './anonymous-post.component';

@NgModule({
  declarations: [AnonymousPostComponent],
  imports: [CommonModule, AnonymousPostRoutingModule],
  exports: [AnonymousPostComponent],
})
export class AnonymousPostModule {}
