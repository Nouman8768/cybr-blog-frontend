import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { CreateModule } from './create/create.module';
import { PostsComponent } from './posts.component';
import { UpdateModule } from './update/update.module';

const routes: Routes = [
  { path: 'create', loadChildren: () => CreateModule },
  { path: 'update/:id', loadChildren: () => UpdateModule },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsRoutingModule {}
