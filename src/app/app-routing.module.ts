import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPostComponent } from './pages/Posts/add-post/add-post.component';
import { HomeComponent } from './pages/home/home.component';
import { UpdatePostComponent } from './pages/Posts/update-post/update-post.component';
import { SinglePostComponent } from './pages/single-post/single-post.component';
import { CategoricallyPostsComponent } from './pages/categorically-posts/categorically-posts.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add-post', component: AddPostComponent },
  { path: 'update-post', component: UpdatePostComponent },
  { path: 'single-post/:slug', component: SinglePostComponent },
  { path: 'category-post/:category', component: CategoricallyPostsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
