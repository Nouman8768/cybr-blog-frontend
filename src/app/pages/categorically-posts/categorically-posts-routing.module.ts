import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoricallyPostsComponent } from './categorically-posts.component';

const routes: Routes = [{ path: '', component: CategoricallyPostsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoricallyPostsRoutingModule {}
