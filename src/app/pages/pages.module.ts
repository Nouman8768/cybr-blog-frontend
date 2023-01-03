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
import { Page403Component } from './page403/page403.component';
import { Page404Component } from './page404/page404.component';

@NgModule({
  declarations: [PagesComponent, Page403Component, Page404Component],
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
