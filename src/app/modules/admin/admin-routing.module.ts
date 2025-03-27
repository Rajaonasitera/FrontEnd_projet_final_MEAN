import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { RendezvousComponent } from './rendezvous/rendezvous.component';
import { CommandeComponent } from './commande/commande.component';
import { HistoriqueComponent } from './historique/historique.component';
import { ProduitComponent } from './produit/produit.component';
import { StockComponent } from './stock/stock.component';
import { ClientComponent } from './client/client.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'rendezvous', pathMatch: 'full' },
      { path: 'rendezvous', component: RendezvousComponent },
      { path: 'commande', component: CommandeComponent },
      { path: 'historique', component: HistoriqueComponent },
      { path: 'produit', component: ProduitComponent },
      { path: 'stock', component: StockComponent },
      { path: 'client', component: ClientComponent },
      { path: '**', redirectTo: 'errors/404' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
