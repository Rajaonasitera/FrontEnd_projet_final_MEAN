import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/utiles/service.service';

@Component({
  selector: 'app-liste-services',
  imports: [CommonModule, FormsModule],
  templateUrl: './liste-services.component.html',
  styleUrls: ['./liste-services.component.css']
})
export class ListeServicesComponent {
  services: any[] = [];
  servicesFilters: any[] = [];
  searchTerm: string = '';
  selectedservice: any = null;
  isEditing: boolean = false;
  isAjoutserviceModalOpen: boolean = false;
  nouveauservice: any = { designation: '', description: '', prixvente: '', typeproduit: 'Article' };

  constructor(
    private router: Router,
    private serviceService: ServiceService
  ) {}

  ngOnInit() {
    this.fetch();  
  }

  async fetch() {
    try {
      this.services = await this.serviceService.getServices();
      this.appliquerFiltres(); 
    } catch (error) {
      this.router.navigate(["error/error-server"]);
    }
  }

  appliquerFiltres() {
    this.servicesFilters = this.services.filter(service => 
      service.designation.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  voirDetails(service: any) {
    this.selectedservice = { ...service };
    this.isEditing = false;
  }

  async enregistrerModification() {
    try {
      // await this.serviceService.updateservice(this.selectedservice);
      this.isEditing = false;
      this.fetch();
    } catch (error) {
      this.router.navigate(["error/error-server"]);
    }
  }

  async supprimerservice(service: any) {
    try {
      // await this.serviceService.deleteservice(service.id);
      this.fetch();
      this.fermerModal();
    } catch (error) {
      this.router.navigate(["error/error-server"]);
    }
  }

  fermerModal() {
    this.selectedservice = null;
  }

  ouvrirAjoutserviceModal() {
    this.isAjoutserviceModalOpen = true;
  }

  fermerAjoutserviceModal() {
    this.isAjoutserviceModalOpen = false;
    this.nouveauservice = { designation: '', description: '', prixvente: '', typeproduit: 'Service' };
  }

  async ajouterservice() {
    try {
      const service = {
        designation: this.nouveauservice.designation,
        description: this.nouveauservice.description,
        prixvente: this.nouveauservice.prixvente,
        typeproduit: this.nouveauservice.typeproduit,

      }
      await this.serviceService.postProduit(service);
      this.fetch();
      this.fermerAjoutserviceModal();
    } catch (error) {
      this.router.navigate(["error/error-server"]);
    }
  }

  onScroll(event: any) {
    console.log('Scrolling detected', event);
  }
}
