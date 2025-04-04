import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { ClientComponent } from '../client/client.component';
import { AdminComponent } from '../admin/admin.component';
import { AuthGuard } from '../guards/auth.guard';
import { ClientAuthGuard } from '../guards/client-auth.guard';
import { AdminAuthGuard } from '../guards/admin-auth.guard';
import { MecaAuthGuard } from '../guards/meca-auth.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    component: LayoutComponent,
    loadChildren: () => import('../dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'client',
    component: LayoutComponent,
    // canActivate: [ClientAuthGuard],
    loadChildren: () => import('../client/client.module').then((m) => m.ClientModule),
  },
  {
    path: 'admin',
    component: LayoutComponent,
    canActivate: [AdminAuthGuard],
    loadChildren: () => import('../admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'meca',
    component: LayoutComponent,
    canActivate: [MecaAuthGuard],
    loadChildren: () => import('../meca/meca.module').then((m) => m.MecaModule),
  },
  {
    path: 'components',
    component: LayoutComponent,
    loadChildren: () => import('../uikit/uikit.module').then((m) => m.UikitModule),
  },
  { path: '', pathMatch: 'full', component: LayoutComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: 'error' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {}
