import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/utiles/service.service';

@Component({
  selector: 'app-liste-reparations',
  imports: [CommonModule, FormsModule],
  templateUrl: './liste-reparations.component.html',
  styleUrls: ['./liste-reparations.component.css']
})
export class ListeReparationsComponent {
  reparations: any[] = [];
  reparationsFilters: any[] = [];
  searchTerm: string = '';
  selectedReparation: any = null;
  isEditing: boolean = false;
  isAjoutReparationModalOpen: boolean = false;
  nouvelleReparation: any = { voiture: '', description: '', date: '', produit: '', etat: 'Confirmée' };

  constructor(
    private router: Router,
    private serviceService: ServiceService
  ) {}

  ngOnInit() {
    this.fetch();
  }

  async fetch() {
    try {
      this.reparations = await this.serviceService.getReparations();
      this.appliquerFiltres();
    } catch (error) {
      this.router.navigate(["error/"]);
    }
  }

  appliquerFiltres() {
    this.reparationsFilters = this.reparations.filter(reparation =>
      reparation.voiture.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      reparation.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  voirDetails(reparation: any) {
    this.selectedReparation = { ...reparation };
    this.isEditing = false;
  }

  async enregistrerModification() {
    try {
      // await this.serviceService.updateReparation(this.selectedReparation);
      this.isEditing = false;
      this.fetch();
    } catch (error) {
      console.error('Error updating reparation:', error);
    }
  }

  async supprimerReparation(reparation: any) {
    try {
      // await this.serviceService.deleteReparation(reparation.id);
      this.fetch();
      this.fermerModal();
    } catch (error) {
      console.error('Error deleting reparation:', error);
    }
  }

  fermerModal() {
    this.selectedReparation = null;
  }

  ouvrirAjoutReparationModal() {
    this.isAjoutReparationModalOpen = true;
  }

  fermerAjoutReparationModal() {
    this.isAjoutReparationModalOpen = false;
    this.nouvelleReparation = { voiture: '', description: '', date: '', produit: '', etat: 'Confirmée' };
  }

  async ajouterReparation() {
    try {
      const reparation = {
        voiture: this.nouvelleReparation.voiture,
        description: this.nouvelleReparation.description,
        daty: this.nouvelleReparation.date,
        produit: this.nouvelleReparation.produit,
        etat: this.nouvelleReparation.etat,
      };
      await this.serviceService.postReparation(reparation);
      this.fetch();
      this.fermerAjoutReparationModal();
    } catch (error) {
      console.error('Error adding reparation:', error);
    }
  }

  onScroll(event: any) {
    console.log('Scrolling detected', event);
  }
}
