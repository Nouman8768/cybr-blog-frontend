import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { CategoricallyPostsModule } from './categorically-posts/categorically-posts.module';
import { HomeModule } from './home/home.module';
import { UserModule } from './user_profile/user.profile.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationModule } from './authentication/authentication.module';
import { PostsModule } from './posts/posts.module';
import { AdminModule } from './admin/admin.module';

@NgModule({
  declarations: [PagesComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    CategoricallyPostsModule,
    HomeModule,
    UserModule,
    PostsModule,
    AuthenticationModule,
    AdminModule,
  ],
})
export class PagesModule {}
