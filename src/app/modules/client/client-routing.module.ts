import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicesComponent } from './services/services.component';
import { ClientComponent } from './client.component';
import { ProfileComponent } from './profile/profile.component';
import { ProduitsComponent } from './produits/produits.component';
import { RendezVousComponent } from './rendez-vous/rendez-vous.component';

const routes: Routes = [
  {
    path: '',
    component: ClientComponent,
    children: [
      { path: '', redirectTo: 'service', pathMatch: 'full' },
      { path: 'service', component: ServicesComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'produits', component: ProduitsComponent },
      { path: 'rendezvous', component: RendezVousComponent },
      { path: '**', redirectTo: 'errors/404' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
