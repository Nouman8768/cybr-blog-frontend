import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guard/auth.guard';
import { AuthorPostsModule } from './author-posts/author-posts.module';
import { CreateModule } from './create/create.module';
import { ReadSinglePostModule } from './read-single-post/read-single-post.module';
import { SearchResultsModule } from './search-results/search-results.module';
import { UpdateModule } from './update/update.module';
import { UserPostsModule } from './user-posts/user-posts.module';

const routes: Routes = [
  {
    path: 'create',
    loadChildren: () => CreateModule,
    canActivate: [AuthGuard],
  },

  {
    path: 'update/:id',
    loadChildren: () => UpdateModule,
    canActivate: [AuthGuard],
  },

  { path: 'single-post/:id', loadChildren: () => ReadSinglePostModule },
  {
    path: 'my-posts',
    loadChildren: () => UserPostsModule,
    canActivate: [AuthGuard],
  },
  {
    path: 'search-results/:text',
    loadChildren: () => SearchResultsModule,
  },
  {
    path: 'author-posts/:author',
    loadChildren: () => AuthorPostsModule,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsRoutingModule {}
