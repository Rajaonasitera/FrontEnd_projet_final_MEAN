import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [DashboardRoutingModule, HttpClientModule],
})
export class DashboardModule {}
