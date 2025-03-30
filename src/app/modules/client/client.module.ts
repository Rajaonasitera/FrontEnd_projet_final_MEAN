import { NgModule } from '@angular/core';

import { ClientRoutingModule } from './client-routing.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [ClientRoutingModule, HttpClientModule],
})
export class ClientModule {}
