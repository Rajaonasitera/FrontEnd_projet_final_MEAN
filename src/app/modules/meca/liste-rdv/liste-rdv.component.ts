import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/utiles/service.service';
@Component({
  selector: 'app-liste-rdv',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './liste-rdv.component.html',
  styleUrls: ['./liste-rdv.component.css']
})
export class ListeRdvComponent implements OnInit {

  rendezvousList: any[] = [];
  selectedRdv: any = null;
  voitures: any[] = [];
  reparations: any[] = [];
  services: any[] = [];

  showVoitureModal = false;
  showReparationModal = false;
  showEnAttenteModal = false;

  nouvelleVoiture: any = {
    marque: '',
    modele: '',
    immatriculation: '',
    annee: new Date().getFullYear(),
    client: 0
  };

  nouvelleReparation: any = {
    description: '',
    voiture: 0,
    daty: new Date(),
    produits: '',
    rdvId: 0
  };

  remarque = '';

  constructor(
    private router: Router, 
    private serviceService: ServiceService
  ) {}
    
  ngOnInit(): void {
    this.fetchRendezVous();
  }

  async fetchRendezVous() {
    const token = localStorage.getItem("Token");
    if (token) {
      const idMeca = await this.serviceService.getIdClient(token);
      if (idMeca) {
        this.rendezvousList = await this.serviceService.getRendezVousByMeca(idMeca);
        for (let rdv of this.rendezvousList) {
          rdv.clientDetail = await this.serviceService.getClient(rdv.client);
        }
      }
    }
  }

  async fetchVoitures(clientId: string) {
    if (!clientId) return;
    if (clientId) {
      this.voitures = await this.serviceService.getVoituresByClient(clientId);
    }
  }

  async fetchReparations(rendezvousId: string) {
    if (!rendezvousId) return;
    this.reparations = await this.serviceService.getReparations(rendezvousId);
  }

  async fetchService() {
    this.services = await this.serviceService.getServices();
  }

  openRdvDetails(rdv: any): void {
    this.selectedRdv = rdv;
    this.fetchVoitures(rdv.client);
    this.fetchReparations(rdv._id);
    this.fetchService();
  }

  closeModal(): void {
    this.selectedRdv = null;
    this.closeModals();
  }

  closeModals(): void {
    this.showVoitureModal = false;
    this.showReparationModal = false;
    this.showEnAttenteModal = false;
    this.resetFormData();
  }

  private resetFormData(): void {
    this.nouvelleVoiture = {
      marque: '',
      modele: '',
      immatriculation: '',
      annee: new Date().getFullYear(),
      client: ''
    };
    
    this.nouvelleReparation = {
      description: '',
      voiture: '',
      daty: new Date(),
      produits: '',
      rdvId: ''
    };
    
    this.remarque = '';
  }

  openAddVoitureModal(): void {
    if (!this.selectedRdv) return;
    this.nouvelleVoiture.client = this.selectedRdv.client;
    this.showVoitureModal = true;
  }

  openAddReparationModal(): void {
    if (!this.selectedRdv) return;
    this.nouvelleReparation.rdvId = this.selectedRdv._id;
    this.showReparationModal = true;
  }

  openEnAttenteModal(): void {
    this.showEnAttenteModal = true;
  }

  getStatusClass(etat: string): string {
    switch(etat) {
      case 'En attente': return 'bg-yellow-100 text-yellow-800';
      case 'Confirmé': return 'bg-blue-100 text-blue-800';
      case 'En cours': return 'bg-purple-100 text-purple-800';
      case 'En attente produits': return 'bg-orange-100 text-orange-800';
      case 'Terminé': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  async addVoiture(){
    if (!this.selectedRdv) return;
    const newVoiture: any = {
      ...this.nouvelleVoiture
    };
    await this.serviceService.postVoiture(newVoiture);
    this.voitures.push(newVoiture);
    this.closeModals();
  }

  async addReparation(){
    if (!this.selectedRdv) return;

    const newReparation = {
      ...this.nouvelleReparation
    };
    
    await this.serviceService.postReparation(newReparation);
    this.reparations.push(newReparation);
    this.closeModals();
  }

  async enAttente(){
    if (!this.selectedRdv) return;
    
    this.selectedRdv.etat = 'En attente produits';
    this.selectedRdv.remarque = this.remarque;
    const token = localStorage.getItem("Token");
    if (token) {
      const { clientDetail, ...rdvWithoutClientDetail } = this.selectedRdv;
      await this.serviceService.updateRendezVous(rdvWithoutClientDetail, token, this.selectedRdv._id);
    }
    this.closeModals();
  }

  async terminerRendezvous(){
    if (!this.selectedRdv) return;
    
    this.selectedRdv.etat = 'Terminé';
    const token = localStorage.getItem("Token");
    if (token) {
      const { clientDetail, ...rdvWithoutClientDetail } = this.selectedRdv;
      await this.serviceService.updateRendezVous(rdvWithoutClientDetail, token, this.selectedRdv._id);
    }
    this.closeModal();
  }

  getVoitureName(voitureId: string): string {
    const voiture = this.voitures.find(v => v._id === voitureId);
    return voiture ? `${voiture.marque} ${voiture.modele} (${voiture.immatriculation})` : 'Inconnue';
  }

  getClientName(clientId: string): string {
    if (this.selectedRdv?.client) {
      return `${this.selectedRdv.client.nom} ${this.selectedRdv.client.prenom}`;
    }
    return `Client #${clientId}`;
  }
}