import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/utiles/service.service';

@Component({
  selector: 'app-liste-rendezvous',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './liste-rendezvous.component.html',
  styleUrls: ['./liste-rendezvous.component.css']
})
export class ListeRendezvousComponent {
  rendezvous: any[] = [];
  mecaniciens: any[] = [];
  rendezvousFilters: any[] = [];
  searchTerm: string = '';
  selectedRendezvous: any = null;

  constructor(
    private router: Router,
    private serviceService: ServiceService
  ) {}

  async ngOnInit() {
    await this.fetchRendezVous();
    await this.fetchMecaniciens();
  }

  async fetchRendezVous() {
    try {
      const rdvs = await this.serviceService.getRendezVous();
  
      this.rendezvous = await Promise.all(rdvs.map(async (rdv: any) => {
        try {
          const clientDetails = await this.serviceService.getClient(rdv.client);
          
          const rendezvousWithDetails = {
            ...rdv,
            client: clientDetails || { id: rdv.client, nom: 'Inconnu', prenom: '', telephone: '' },
            personnel: null 
          };

          if (rdv.personnel && rdv.personnel !== 'En attente') {
            try {
              const personnelDetails = await this.serviceService.getClient(rdv.personnel);
              rendezvousWithDetails.personnel = personnelDetails || { 
                id: rdv.personnel, 
                nom: 'Mécanicien inconnu', 
                prenom: '', 
                telephone: '' 
              };
            } catch (error) {
              console.error(`Error fetching personnel ${rdv.personnel}:`, error);
              rendezvousWithDetails.personnel = { 
                id: rdv.personnel, 
                nom: 'Erreur chargement', 
                prenom: '', 
                telephone: '' 
              };
            }
          }
  
          return rendezvousWithDetails;
  
        } catch (error) {
          console.error(`Error processing rendezvous ${rdv.id}:`, error);
          return {
            ...rdv,
            client: { id: rdv.client, nom: 'Erreur chargement', prenom: '', telephone: '' },
            personnel: rdv.personnel ? { id: rdv.personnel, nom: 'Erreur chargement', prenom: '', telephone: '' } : null
          };
        }
      }));
  
      this.appliquerFiltres();
    } catch (error) {
      console.error('Error fetching rendezvous:', error);
      this.router.navigate(["error/error-server"]);
    }
  }

  async fetchMecaniciens() {
    try {
      this.mecaniciens = await this.serviceService.getMecaniciens();
    } catch (error) {
      this.router.navigate(["error/error-server"]);
    }
  }

  appliquerFiltres() {
    if (!this.searchTerm) {
      this.rendezvousFilters = [...this.rendezvous];
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.rendezvousFilters = this.rendezvous.filter(rdv => 
      (rdv.client.nom + ' ' + rdv.client.prenom).toLowerCase().includes(term) ||
      rdv.description.toLowerCase().includes(term)
    );
  }

  voirDetails(rendezvous: any) {
    this.selectedRendezvous = { ...rendezvous };
  }

  async assignerMecanicien() {
    try {
      const token = localStorage.getItem("Token");
      const rdv = {
        description: this.selectedRendezvous.description,
        date: this.selectedRendezvous.date,
        heure: this.selectedRendezvous.heure,
        lieu: this.selectedRendezvous.lieu,
        remarque: this.selectedRendezvous.remarque,
        client: this.selectedRendezvous.client,
        etat: "En cours",
        personnel : this.selectedRendezvous.mecanicienId
      }
      if (rdv) {
        await this.serviceService.updateRendezVous(rdv,token,this.selectedRendezvous._id);
        this.fetchRendezVous();
        this.fermerModal();
      }
    } catch (error) {
      console.error('Error assigning mecanicien:', error);
      this.router.navigate(["error/error-server"]);
    }
  }

  async annulerRendezVous() {
      try {
        const token = localStorage.getItem("Token");
        const rdv = {
          description: this.selectedRendezvous.description,
          date: this.selectedRendezvous.date,
          heure: this.selectedRendezvous.heure,
          lieu: this.selectedRendezvous.lieu,
          remarque: this.selectedRendezvous.remarque,
          client: this.selectedRendezvous.client,
          etat: "Annulé",
          personnel : ""
        }
        if (rdv) {
          await this.serviceService.updateRendezVous(rdv,token,this.selectedRendezvous._id);
          this.fetchRendezVous();
        }
      this.fetchRendezVous();
      this.fermerModal();
    } catch (error) {
      console.error('Error cancelling rendezvous:', error);
      this.router.navigate(["error/error-server"]);
    }
  }

  fermerModal() {
    this.selectedRendezvous = null;
  }

  getMecanicienName(id: number): string {
    const mecanicien = this.mecaniciens.find(m => m.id === id);
    return mecanicien ? `${mecanicien.nom} ${mecanicien.prenom}` : 'Non assigné';
  }
}