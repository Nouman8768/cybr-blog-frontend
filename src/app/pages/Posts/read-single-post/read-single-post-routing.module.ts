import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReadSinglePostComponent } from './read-single-post.component';

const routes: Routes = [{ path: '', component: ReadSinglePostComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReadSinglePostRoutingModule { }
