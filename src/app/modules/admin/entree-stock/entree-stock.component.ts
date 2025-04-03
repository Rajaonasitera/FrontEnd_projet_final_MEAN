import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/utiles/service.service';

@Component({
  selector: 'app-entree-stock',
  imports: [CommonModule, FormsModule],
  templateUrl: './entree-stock.component.html',
  styleUrls: ['./entree-stock.component.css']
})
export class EntreeStockComponent {
  stocks: any[] = [];
  stocksFiltres: any[] = [];
  produits: any[] = []; 
  searchTerm: string = '';
  selectedStock: any = null;
  isEditing: boolean = false;
  isEntreeStockModalOpen: boolean = false;
  nouvelleEntree: any = { 
    produitId: '', 
    quantite: 0
  };

  constructor(
    private router: Router,
    private serviceService: ServiceService
  ) {}

  async ngOnInit() {
    await this.fetchStocks();
    await this.fetchProduits();
  }

  async fetchStocks() {
    try {
      this.stocks = await this.serviceService.getStocks();
      this.appliquerFiltres();
    } catch (error) {
      console.log(error);
      
      this.router.navigate(["error/error-server"]);
    }
  }

  async fetchProduits() {
    try {
      this.produits = await this.serviceService.getProduits();
    } catch (error) {
      console.error("Erreur lors de la récupération des produits", error);
    }
  }

  appliquerFiltres() {
    this.stocksFiltres = this.stocks.filter(stock => 
      stock.produitId.designation.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  voirDetails(stock: any) {
    this.selectedStock = { ...stock };
    this.isEditing = false;
  }

  async enregistrerModificationStock() {
    try {
      // await this.serviceService.updateStock(this.selectedStock);
      this.isEditing = false;
      await this.fetchStocks();
    } catch (error) {
      this.router.navigate(["error/error-server"]);
    }
  }

  async supprimerStock(stock: any) {
    try {
      // await this.serviceService.deleteStock(stock.id);
      await this.fetchStocks();
      this.fermerModal();
    } catch (error) {
      this.router.navigate(["error/error-server"]);
    }
  }

  fermerModal() {
    this.selectedStock = null;
  }

  ouvrirEntreeStockModal() {
    this.isEntreeStockModalOpen = true;
  }

  fermerEntreeStockModal() {
    this.isEntreeStockModalOpen = false;
    this.nouvelleEntree = { produitId: '', quantite: 0 };
  }

  async ajouterEntreeStock() {
    try {
      const entreeStock = {
        produitId: this.nouvelleEntree.produitId,
        quantite: Number(this.nouvelleEntree.quantite)
      };

      await this.serviceService.postStock(entreeStock);
      await this.fetchStocks();
      this.fermerEntreeStockModal();
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'entrée de stock", error);
      this.router.navigate(["error/error-server"]);
    }
  }
}