import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/utiles/service.service';

@Component({
  selector: 'app-liste-produits',
  imports: [CommonModule, FormsModule],
  templateUrl: './liste-produits.component.html',
  styleUrls: ['./liste-produits.component.css']
})
export class ListeProduitsComponent {
  produits: any[] = [];
  produitsFilters: any[] = [];
  searchTerm: string = '';
  selectedProduit: any = null;
  isEditing: boolean = false;
  isAjoutProduitModalOpen: boolean = false;
  nouveauProduit: any = { designation: '', description: '', prixvente: '', typeproduit: 'Article' };

  constructor(
    private router: Router,
    private serviceService: ServiceService
  ) {}

  ngOnInit() {
    this.fetch();  
  }

  async fetch() {
    try {
      this.produits = await this.serviceService.getProduits();
      this.appliquerFiltres(); 
    } catch (error) {
      this.router.navigate(["error/error-server"]);
    }
  }

  appliquerFiltres() {
    this.produitsFilters = this.produits.filter(produit => 
      produit.designation.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      produit.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  voirDetails(produit: any) {
    this.selectedProduit = { ...produit };
    this.isEditing = false;
  }

  async enregistrerModification() {
    try {
      // await this.serviceService.updateProduit(this.selectedProduit);
      this.isEditing = false;
      this.fetch();
    } catch (error) {
      this.router.navigate(["error/error-server"]);
    }
  }

  async supprimerProduit(produit: any) {
    try {
      // await this.serviceService.deleteProduit(produit.id);
      this.fetch();
      this.fermerModal();
    } catch (error) {
      this.router.navigate(["error/error-server"]);
    }
  }

  fermerModal() {
    this.selectedProduit = null;
  }

  ouvrirAjoutProduitModal() {
    this.isAjoutProduitModalOpen = true;
  }

  fermerAjoutProduitModal() {
    this.isAjoutProduitModalOpen = false;
    this.nouveauProduit = { designation: '', description: '', prixvente: '', typeproduit: 'Article' };
  }

  async ajouterProduit() {
    try {
      const produit = {
        designation: this.nouveauProduit.designation,
        description: this.nouveauProduit.description,
        prixvente: this.nouveauProduit.prixvente,
        typeproduit: this.nouveauProduit.typeproduit,

      }
      await this.serviceService.postProduit(produit);
      this.fetch();
      this.fermerAjoutProduitModal();
    } catch (error) {
      this.router.navigate(["error/error-server"]);
    }
  }

  onScroll(event: any) {
    console.log('Scrolling detected', event);
  }
}
