import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnonymousPostComponent } from './anonymous-post.component';

const routes: Routes = [{ path: '', component: AnonymousPostComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnonymousPostRoutingModule { }
