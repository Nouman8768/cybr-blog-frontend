import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeModule } from './pages/home/home.module';
import { PagesModule } from './pages/pages.module';

import { SharedModule } from './shared/shared.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => HomeModule,
  },

  {
    path: 'shared',
    loadChildren: () => SharedModule,
  },
  {
    path: 'pages',
    loadChildren: () => PagesModule,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
