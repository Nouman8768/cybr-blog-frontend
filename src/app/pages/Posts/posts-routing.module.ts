import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateModule } from './create/create.module';
import { ReadSinglePostModule } from './read-single-post/read-single-post.module';
import { UpdateModule } from './update/update.module';

const routes: Routes = [
  { path: 'create', loadChildren: () => CreateModule },
  { path: 'update/:id', loadChildren: () => UpdateModule },
  { path: 'single-post/:id', loadChildren: () => ReadSinglePostModule },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsRoutingModule {}
