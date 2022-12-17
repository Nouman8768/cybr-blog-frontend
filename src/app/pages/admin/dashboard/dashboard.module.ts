import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { CardComponent } from './components/card/card.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [DashboardComponent, CardComponent],
  imports: [CommonModule, DashboardRoutingModule, SharedModule],
  exports: [CardComponent, DashboardComponent],
})
export class DashboardModule {}
