import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorPostsComponent } from './author-posts.component';

const routes: Routes = [{ path: '', component: AuthorPostsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorPostsRoutingModule { }
