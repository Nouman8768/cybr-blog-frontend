import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AllUsersModule } from './all-users/all-users.module';
import { DashboardModule } from './dashboard/dashboard.module';

const routes: Routes = [
  // { path: '', component: AdminComponent },
  {
    path: 'dashboard',
    loadChildren: () => DashboardModule,
  },
  {
    path: 'allusers',
    loadChildren: () => AllUsersModule,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
