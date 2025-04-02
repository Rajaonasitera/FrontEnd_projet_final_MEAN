import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../admin/dashboard/dashboard.component';
import { ErrorComponent } from '../error/error.component';
import { MecaComponent } from './meca.component';
import { ListeRdvComponent } from './liste-rdv/liste-rdv.component';
import { ListeVoituresComponent } from './liste-voitures/liste-voitures.component';
// import { DetailRdvComponent } from './detail-rdv/detail-rdv.component';

const routes: Routes = [
  {
    path: '',
    component: MecaComponent,
    children: [
      { path: '', redirectTo: 'rdv', pathMatch: 'full' },
      { path: 'rdv', component: ListeRdvComponent },
      // { path: 'detail-rdv/:id', component: DetailRdvComponent },
      { path: 'liste-voitures', component: ListeVoituresComponent },
      { path: '**', redirectTo: 'errors/404' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MecaRoutingModule {}
