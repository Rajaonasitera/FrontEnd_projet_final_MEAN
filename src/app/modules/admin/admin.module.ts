import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  imports: [AdminRoutingModule, HttpClientModule],
})
export class AdminModule {}
