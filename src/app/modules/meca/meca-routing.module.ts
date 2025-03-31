import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../admin/dashboard/dashboard.component';
import { ErrorComponent } from '../error/error.component';
import { MecaComponent } from './meca.component';
import { ListeRdvComponent } from './liste-rdv/liste-rdv.component';

const routes: Routes = [
  {
    path: '',
    component: MecaComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'rdv', component: ListeRdvComponent },
       { path: '**', component: ErrorComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MecaRoutingModule {}
