import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoricallyPostsModule } from './pages/categorically-posts/categorically-posts.module';

import { HomeModule } from './pages/home/home.module';
import { PagesModule } from './pages/pages.module';
import { CreateModule } from './pages/posts/create/create.module';
import { ReadSinglePostModule } from './pages/posts/read-single-post/read-single-post.module';
import { UpdateModule } from './pages/posts/update/update.module';
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
    path: 'single-post/:id',
    loadChildren: () => ReadSinglePostModule,
  },
  {
    path: 'create',
    loadChildren: () => CreateModule,
  },
  {
    path: 'update/:id',
    loadChildren: () => UpdateModule,
  },
  {
    path: 'shared',
    loadChildren: () => SharedModule,
  },
  {
    path: 'pages',
    loadChildren: () => PagesModule,
  },
  { path: 'posts', loadChildren: () => import('./pages/posts/posts.module').then(m => m.PostsModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
