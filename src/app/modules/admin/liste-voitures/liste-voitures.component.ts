import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/utiles/service.service';

@Component({
  selector: 'liste-voitures.component',
  imports: [CommonModule, FormsModule],
  templateUrl: './liste-voitures.component.html',
  styleUrl: './liste-voitures.component.css'
})

export class ListeVoituresComponent {
  voitures: any[] = [];
  voituresFilters: any[] = [];
  searchTerm: string = '';
  selectedVoiture: any = null;
  isEditing: boolean = false;
  isAjoutVoitureModalOpen: boolean = false;
  nouvelleVoiture: any = { marque: '', modele: '', immatriculation: '', annee: '', client: '' };

  constructor(
    private router: Router,
    private serviceService: ServiceService
  ) {}

  ngOnInit() {
    this.fetch();
  }

  async fetch() {
    try {
      this.voitures = await this.serviceService.getVoitures();
      this.appliquerFiltres();
    } catch (error) {
      this.router.navigate(["error/"]);
    }
  }

  appliquerFiltres() {
    this.voituresFilters = this.voitures.filter(voiture =>
      voiture.marque.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      voiture.modele.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      voiture.immatriculation.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      voiture.client.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  voirDetails(voiture: any) {
    this.selectedVoiture = { ...voiture };
    this.isEditing = false;
  }

  async enregistrerModification() {
    try {
      // await this.serviceService.updateVoiture(this.selectedVoiture);
      this.isEditing = false;
      this.fetch();
    } catch (error) {
      console.error('Error updating voiture:', error);
    }
  }

  async supprimerVoiture(voiture: any) {
    try {
      // await this.serviceService.deleteVoiture(voiture.id);
      this.fetch();
      this.fermerModal();
    } catch (error) {
      console.error('Error deleting voiture:', error);
    }
  }

  fermerModal() {
    this.selectedVoiture = null;
  }

  ouvrirAjoutVoitureModal() {
    this.isAjoutVoitureModalOpen = true;
  }

  fermerAjoutVoitureModal() {
    this.isAjoutVoitureModalOpen = false;
    this.nouvelleVoiture = { marque: '', modele: '', immatriculation: '', annee: '', client: '' };
  }

  async ajouterVoiture() {
    try {
      const voiture = {
        marque: this.nouvelleVoiture.marque,
        modele: this.nouvelleVoiture.modele,
        immatriculation: this.nouvelleVoiture.immatriculation,
        annee: this.nouvelleVoiture.annee,
        client: this.nouvelleVoiture.client,
      };
      await this.serviceService.postVoiture(voiture);
      this.fetch();
      this.fermerAjoutVoitureModal();
    } catch (error) {
      console.error('Error adding voiture:', error);
    }
  }

  onScroll(event: any) {
    console.log('Scrolling detected', event);
  }
}

