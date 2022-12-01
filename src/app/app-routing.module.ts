import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsModule } from './pages/posts/posts.module';
import { AuthenticationModule } from './pages/authentication/authentication.module';
import { LoginComponent } from './pages/authentication/login/login.component';
import { SignupComponent } from './pages/authentication/signup/signup.component';
import { CategoricallyPostsModule } from './pages/categorically-posts/categorically-posts.module';

import { HomeModule } from './pages/home/home.module';
import { PagesModule } from './pages/pages.module';

import { AuthGuard } from './shared/guard/auth.guard';

import { AnonymousPostModule } from './shared/module/anonymous-post/anonymous-post.module';
import { FooterModule } from './shared/module/footer/footer.module';
import { PopularSidebarPostModule } from './shared/module/popular-sidebar-post/popular-sidebar-post.module';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './pages/user/user.module';

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
  {
    path: 'user',
    loadChildren: () => UserModule,
    canActivate: [AuthGuard],
  },

  // {
  //   path: 'login',
  //   component: LoginComponent,
  // },
  // {
  //   path: 'signup',
  //   component: SignupComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
