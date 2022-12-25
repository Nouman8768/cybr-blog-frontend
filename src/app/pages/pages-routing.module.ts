import { AdminModule } from './admin/admin.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guard/auth.guard';
import { CategoricallyPostsModule } from './categorically-posts/categorically-posts.module';
import { PagesComponent } from './pages.component';

import { UserModule } from './user_profile/user.profile.module';
import { PostsModule } from './posts/posts.module';
import { AdminGuard } from '../shared/guard/admin.guard';

const routes: Routes = [
  { path: '', component: PagesComponent },
  {
    path: 'my-profile',
    loadChildren: () => UserModule,
    canActivate: [AuthGuard],
  },

  {
    path: 'category-post/:category',
    loadChildren: () => CategoricallyPostsModule,
  },
  {
    path: 'posts',
    loadChildren: () => PostsModule,
  },
  {
    path: 'admin',
    canActivate: [AdminGuard],

    loadChildren: () => AdminModule,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
