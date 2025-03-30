import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/utiles/service.service';

@Component({
  selector: 'app-liste-clients',
  imports:[CommonModule, FormsModule],
  templateUrl: './liste-clients.component.html',
  styleUrls: ['./liste-clients.component.css']
})
export class ListeClientsComponent {
  clients: any[] = [];
  clientsFilters: any[] = [];
  searchTerm: string = '';
  selectedClient: any = null;
  isEditing: boolean = false;
  isAjoutClientModalOpen: boolean = false;
  nouveauClient: any = { name: '', email: '', numero: '' , password: ''};

  constructor(
    private router: Router, 
    private serviceService: ServiceService
  ) {}

  ngOnInit() {
    this.fetch();  
  }

  async fetch() {
    try {
      this.clients = await this.serviceService.getClients();
      this.appliquerFiltres(); 
    } catch (error) {
      this.router.navigate(["error/"]) 
    }
  }

  appliquerFiltres() {
    this.clientsFilters = this.clients.filter(client => 
      client.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  voirDetails(client: any) {
    this.selectedClient = { ...client };
    this.isEditing = false;
  }

  async enregistrerModification() {
    try {
      // await this.serviceService.updateClient(this.selectedClient);
      this.isEditing = false;
      this.fetch();
    } catch (error) {
      console.error('Error updating client:', error);
    }
  }

  async supprimerClient(client: any) {
    try {
      // await this.serviceService.deleteClient(client.id);
      this.fetch();
      this.fermerModal();
    } catch (error) {
      console.error('Error deleting client:', error);
    }
  }

  fermerModal() {
    this.selectedClient = null;
  }

  ouvrirAjoutClientModal() {
    this.isAjoutClientModalOpen = true;
  }

  fermerAjoutClientModal() {
    this.isAjoutClientModalOpen = false;
    this.nouveauClient = { name: '', email: '', numero: '' };
  }

  async ajouterClient() {
    try {
      await this.serviceService.createUsers(this.nouveauClient.name, this.nouveauClient.email, this.nouveauClient.numero, this.nouveauClient.password);
      this.fetch();
      this.fermerAjoutClientModal();
    } catch (error) {
      console.error('Error adding client:', error);
    }
  }

  onScroll(event: any) {
    console.log('Scrolling detected', event);
  }
}