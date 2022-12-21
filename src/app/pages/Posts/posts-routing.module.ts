import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateModule } from './create/create.module';
import { ReadSinglePostModule } from './read-single-post/read-single-post.module';
import { SearchResultsModule } from './search-results/search-results.module';
import { UpdateModule } from './update/update.module';
import { UserPostsModule } from './user-posts/user-posts.module';

const routes: Routes = [
  { path: 'create', loadChildren: () => CreateModule },
  { path: 'update/:id', loadChildren: () => UpdateModule },
  { path: 'single-post/:id', loadChildren: () => ReadSinglePostModule },
  {
    path: 'my-posts',
    loadChildren: () => UserPostsModule,
  },
  {
    path: 'search-results',
    loadChildren: () => SearchResultsModule,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsRoutingModule {}
