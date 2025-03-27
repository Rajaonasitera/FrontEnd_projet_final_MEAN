import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-commande',
  imports: [CommonModule],
  templateUrl: './commande.component.html',
  styleUrl: './commande.component.css'
})
export class CommandeComponent {
  achatsClients = [
    {
      id: 1,
      client: 'Jean Dupont',
      produit: 'Huile moteur 5W30',
      prix: 29.99,
      quantite: 2,
      etat: 'En attente',
    },
    {
      id: 2,
      client: 'Sophie Martin',
      produit: 'Batterie VARTA 12V 60Ah',
      prix: 89.99,
      quantite: 1,
      etat: 'Payé',
    },
    {
      id: 3,
      client: 'Lucas Bernard',
      produit: 'Filtre à huile BOSCH',
      prix: 12.50,
      quantite: 3,
      etat: 'En attente',
    },
    {
      id: 4,
      client: 'Emma Lefevre',
      produit: 'Plaquettes de frein BREMBO',
      prix: 49.99,
      quantite: 1,
      etat: 'Payé',
    },
    {
      id: 5,
      client: 'Paul Durant',
      produit: 'Bougies d’allumage NGK',
      prix: 9.99,
      quantite: 4,
      etat: 'En attente',
    },
  ];

  marquerCommePaye(achat: any) {
    achat.etat = 'Payé';
  }
}
