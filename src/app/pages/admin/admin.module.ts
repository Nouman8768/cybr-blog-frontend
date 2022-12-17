import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { AllUsersModule } from './all-users/all-users.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    DashboardModule,
    AllUsersModule,
    SharedModule,
  ],
})
export class AdminModule {}
