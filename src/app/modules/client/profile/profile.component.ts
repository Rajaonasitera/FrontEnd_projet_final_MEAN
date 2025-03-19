import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [
    CommonModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  suiviServices = [
    { nom: 'Vidange', statut: 'En cours', dateRdv: new Date('2024-03-21') },
    { nom: 'Changement des freins', statut: 'Terminé', dateRdv: new Date('2024-03-18') },
    { nom: 'Révision moteur', statut: 'En attente', dateRdv: new Date('2024-03-25') },
    { nom: 'Contrôle technique', statut: 'En cours', dateRdv: new Date('2024-03-22') }
  ];
  
  produitsAchetes = [
    { nom: 'Huile moteur 5W30', prix: 35, quantite: 2, dateAchat: new Date('2024-03-15') },
    { nom: 'Batterie Bosch 12V', prix: 120, quantite: 1, dateAchat: new Date('2024-03-10') },
    { nom: 'Filtre à air', prix: 18, quantite: 1, dateAchat: new Date('2024-03-12') },
    { nom: 'Bougies d’allumage', prix: 50, quantite: 4, dateAchat: new Date('2024-03-14') }
  ];
  
  
  ngOnInit() {}
}
