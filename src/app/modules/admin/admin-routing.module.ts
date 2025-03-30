import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ListeClientsComponent } from './liste-clients/liste-clients.component';
import { ListeProduitsComponent } from './liste-produits/liste-produits.component';
import { ListeServicesComponent } from './liste-services/liste-services.component';
import { ListeVoituresComponent } from './liste-voitures/liste-voitures.component';
import { ListeRendezvousComponent } from './liste-rendezvous/liste-rendezvous.component';
import { ErrorComponent } from '../error/error.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListeReparationsComponent } from './liste-reparations/liste-reparations.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'liste-clients', component: ListeClientsComponent },
      { path: 'liste-produits', component: ListeProduitsComponent },
      { path: 'liste-services', component: ListeServicesComponent },
      { path: 'liste-voitures', component: ListeVoituresComponent },
      { path: 'liste-rendezvous', component: ListeRendezvousComponent },
      { path: 'liste-reparations', component: ListeReparationsComponent },
       { path: '**', component: ErrorComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
