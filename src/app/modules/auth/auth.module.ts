import { NgModule } from '@angular/core';

import { HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({ imports: [AuthRoutingModule, AngularSvgIconModule.forRoot(), HttpClientModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AuthModule {}
