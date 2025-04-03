import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ListeClientsComponent } from './liste-clients/liste-clients.component';
import { ListeProduitsComponent } from './liste-produits/liste-produits.component';
import { ListeServicesComponent } from './liste-services/liste-services.component';
import { ListeRendezvousComponent } from './liste-rendezvous/liste-rendezvous.component';
import { ErrorComponent } from '../error/error.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListeReparationsComponent } from './liste-reparations/liste-reparations.component';
import { EntreeStockComponent } from './entree-stock/entree-stock.component';

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
      { path: 'liste-rendezvous', component: ListeRendezvousComponent },
      { path: 'liste-reparations', component: ListeReparationsComponent },
      { path: 'entree-stock', component: EntreeStockComponent },
       { path: '**', redirectTo: 'errors/404' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
