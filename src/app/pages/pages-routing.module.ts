import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guard/auth.guard';
import { PagesComponent } from './pages.component';
import { UserModule } from './user/user.module';

const routes: Routes = [
  { path: '', component: PagesComponent },
  {
    path: 'user',
    loadChildren: () => UserModule,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
