import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { CategoricallyPostsModule } from './categorically-posts/categorically-posts.module';
import { HomeModule } from './home/home.module';
import { UserModule } from './user/user.module';

@NgModule({
  declarations: [PagesComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    CategoricallyPostsModule,
    HomeModule,
    UserModule,
  ],
})
export class PagesModule {}
