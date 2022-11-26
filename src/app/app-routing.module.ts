import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationModule } from './pages/authentication/authentication.module';
import { CategoricallyPostsModule } from './pages/categorically-posts/categorically-posts.module';

import { HomeModule } from './pages/home/home.module';
import { PagesModule } from './pages/pages.module';
import { CreateComponent } from './pages/Posts/create/create.component';

import { PostsModule } from './pages/Posts/posts.module';

import { AnonymousPostModule } from './shared/module/anonymous-post/anonymous-post.module';
import { FooterModule } from './shared/module/footer/footer.module';
import { PopularSidebarPostModule } from './shared/module/popular-sidebar-post/popular-sidebar-post.module';
import { SharedModule } from './shared/shared.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => HomeModule,
  },
  {
    path: 'category-post/:category',
    loadChildren: () => CategoricallyPostsModule,
  },
  {
    path: 'footer',
    loadChildren: () => FooterModule,
  },
  {
    path: 'PopularSidebarPost',
    loadChildren: () => PopularSidebarPostModule,
  },
  {
    path: 'anonymous-post',
    loadChildren: () => AnonymousPostModule,
  },

  {
    path: 'shared',
    loadChildren: () => SharedModule,
  },
  {
    path: 'pages',
    loadChildren: () => PagesModule,
  },
  {
    path: 'posts',
    loadChildren: () => PostsModule,
  },
  {
    path: 'authentication',
    loadChildren: () => AuthenticationModule,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
