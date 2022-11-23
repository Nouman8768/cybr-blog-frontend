import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PopularSidebarPostComponent } from './popular-sidebar-post.component';

const routes: Routes = [{ path: '', component: PopularSidebarPostComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PopularSidebarPostRoutingModule { }
