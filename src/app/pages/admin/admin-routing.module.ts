import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guard/auth.guard';
import { AllUsersModule } from './all-users/all-users.module';
import { DashboardModule } from './dashboard/dashboard.module';

const routes: Routes = [
  // { path: '', component: AdminComponent },
  {
    path: 'dashboard',
    loadChildren: () => DashboardModule,
    canActivate: [AuthGuard],
  },
  {
    path: 'allusers',
    loadChildren: () => AllUsersModule,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
