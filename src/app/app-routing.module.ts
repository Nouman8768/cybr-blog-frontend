import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeModule } from './pages/home/home.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => HomeModule,
  },
  {
    path: 'category-post/:category',
    loadChildren: () =>
      import('./pages/categorically-posts/categorically-posts.module').then(
        (m) => m.CategoricallyPostsModule
      ),
  },
  {
    path: 'footer',
    loadChildren: () =>
      import('./shared/module/footer/footer.module').then(
        (m) => m.FooterModule
      ),
  },
  {
    path: 'PopularSidebarPost',
    loadChildren: () =>
      import(
        './shared/module/popular-sidebar-post/popular-sidebar-post.module'
      ).then((m) => m.PopularSidebarPostModule),
  },
  {
    path: 'anonymous-post',
    loadChildren: () =>
      import('./shared/module/anonymous-post/anonymous-post.module').then(
        (m) => m.AnonymousPostModule
      ),
  },
  {
    path: 'single-post/:id',
    loadChildren: () =>
      import('./pages/Posts/read-single-post/read-single-post.module').then(
        (m) => m.ReadSinglePostModule
      ),
  },
  {
    path: 'create',
    loadChildren: () =>
      import('./pages/Posts/create/create.module').then((m) => m.CreateModule),
  },
  {
    path: 'update/:id',
    loadChildren: () =>
      import('./pages/Posts/update/update.module').then((m) => m.UpdateModule),
  },
  { path: 'shared', loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
