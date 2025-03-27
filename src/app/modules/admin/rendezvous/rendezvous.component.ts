import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-rendezvous',
  imports: [
    CommonModule
  ],
  templateUrl: './rendezvous.component.html',
  styleUrl: './rendezvous.component.css'
})
export class RendezvousComponent {
  rendezVousList = [
    {
      id: 1,
      client: { nom: 'Jean Dupont', telephone: '06 12 34 56 78' },
      voiture: 'Peugeot 208',
      service: 'Vidange et changement de filtres',
      lieu: 'Garage AutoPlus, Paris',
      dateRdv: new Date('2024-03-21T10:00:00'),
    },
    {
      id: 2,
      client: { nom: 'Marie Curie', telephone: '07 98 76 54 32' },
      voiture: 'Renault Clio',
      service: 'Changement des plaquettes de frein',
      lieu: 'Garage Speedy, Lyon',
      dateRdv: new Date('2024-03-22T14:30:00'),
    },
    {
      id: 3,
      client: { nom: 'Albert Einstein', telephone: '06 22 33 44 55' },
      voiture: 'BMW X5',
      service: 'Diagnostic complet',
      lieu: 'Garage MécanoPro, Marseille',
      dateRdv: new Date('2024-03-23T09:15:00'),
    }
  ];  

  accepterRdv(id: number) {
    console.log(`Rendez-vous ${id} accepté.`);
    // Ajoute ici la logique pour mettre à jour le statut dans la base de données
  }
  
  refuserRdv(id: number) {
    console.log(`Rendez-vous ${id} refusé.`);
    // Ajoute ici la logique pour supprimer ou refuser le rendez-vous
  }
  

  ngOnInit() {
    this.rendezVousList = this.rendezVousList.map(rdv => ({
      ...rdv,
      dateRdv: new Date(rdv.dateRdv)
    }));
  }

}
