import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPostComponent } from './pages/Posts/add-post/add-post.component';
import { HomeComponent } from './pages/home/home.component';
import { UpdatePostComponent } from './pages/Posts/update-post/update-post.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add-post', component: AddPostComponent },
  { path: 'update-post', component: UpdatePostComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
