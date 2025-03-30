import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/utiles/service.service';

@Component({
  selector: 'app-liste-rendezvous',
  imports: [CommonModule, FormsModule],
  templateUrl: './liste-rendezvous.component.html',
  styleUrl: './liste-rendezvous.component.css'
})
export class ListeRendezvousComponent {
  rendezvous: any[] = [];
  rendezvousFilters: any[] = [];
  searchTerm: string = '';
  selectedRendezvous: any = null;
  isEditing: boolean = false;
  isAjoutRendezvousModalOpen: boolean = false;
  nouveauRendezvous: any = { client: '', description: '', date: '', heure: '', lieu: '', etat: 'Confirmé', personnel: '' };

  constructor(
    private router: Router,
    private serviceService: ServiceService
  ) {}

  ngOnInit() {
    this.fetch();
  }

  async fetch() {
    try {
      this.rendezvous = await this.serviceService.getRendezVous();
      this.appliquerFiltres();
    } catch (error) {
      this.router.navigate(["error/"]);
    }
  }

  appliquerFiltres() {
    this.rendezvousFilters = this.rendezvous.filter(rendezvous =>
      rendezvous.client.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      rendezvous.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  voirDetails(rendezvous: any) {
    this.selectedRendezvous = { ...rendezvous };
    this.isEditing = false;
  }

  async enregistrerModification() {
    try {
      // await this.serviceService.updateRendezvous(this.selectedRendezvous);
      this.isEditing = false;
      this.fetch();
    } catch (error) {
      console.error('Error updating rendezvous:', error);
    }
  }

  async supprimerRendezvous(rendezvous: any) {
    try {
      // await this.serviceService.deleteRendezvous(rendezvous.id);
      this.fetch();
      this.fermerModal();
    } catch (error) {
      console.error('Error deleting rendezvous:', error);
    }
  }

  fermerModal() {
    this.selectedRendezvous = null;
  }

  ouvrirAjoutRendezvousModal() {
    this.isAjoutRendezvousModalOpen = true;
  }

  fermerAjoutRendezvousModal() {
    this.isAjoutRendezvousModalOpen = false;
    this.nouveauRendezvous = { client: '', description: '', date: '', heure: '', lieu: '', etat: 'Confirmé', personnel: '' };
  }

  async ajouterRendezvous() {
    try {
      const rendezvous = {
        client: this.nouveauRendezvous.client,
        description: this.nouveauRendezvous.description,
        date: this.nouveauRendezvous.date,
        heure: this.nouveauRendezvous.heure,
        lieu: this.nouveauRendezvous.lieu,
        etat: this.nouveauRendezvous.etat,
        personnel: this.nouveauRendezvous.personnel,
      };
      await this.serviceService.postRendezVous(rendezvous);
      this.fetch();
      this.fermerAjoutRendezvousModal();
    } catch (error) {
      console.error('Error adding rendezvous:', error);
    }
  }

  onScroll(event: any) {
    console.log('Scrolling detected', event);
  }
}

