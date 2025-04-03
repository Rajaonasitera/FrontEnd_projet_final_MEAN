import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/utiles/service.service';

@Component({
  selector: 'app-produits',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent {
  produits: any[] = [];
  selectedProduit: any = null;
  quantity: number = 1;
  adresse: string = "";
  panier: { produit: any, quantity: number }[] = [];

  constructor(private serviceService: ServiceService, private router: Router) {}

  ngOnInit() {
    this.fetch();
  }

  async fetch() {
    try {
      this.produits = await this.serviceService.getArticles();
    } catch (error) {
      this.router.navigate(["error/error-server"]);
    }
  }

  openModal(produit: any): void {
    this.selectedProduit = produit;
    this.quantity = 1;
  }

  closeModal(): void {
    this.selectedProduit = null;
  }

  async ajouterAuPanier() {
    if (this.selectedProduit) {
      const qtStock = await this.serviceService.getNbDispoStock(this.selectedProduit._id);
      
      if (Number(qtStock.qte) >= this.quantity ) {
        const index = this.panier.findIndex(item => item.produit._id === this.selectedProduit._id);

        if (index !== -1) {
          this.panier[index].quantity += this.quantity;
        } else {
          this.panier.push({ produit: this.selectedProduit, quantity: this.quantity });
        }
      }else{
        alert("Quantité insuffisante en stock. Seulement "+ qtStock.qte +" unités restantes.");
      }
      this.closeModal();
    }
  }

  getTotalItems() {
    return this.panier.reduce((total, item) => total + item.quantity, 0);
  }

  async confirmerAchat() {
    const token = localStorage.getItem("Token");
    if (token) {
      const id = await this.serviceService.getIdClient(token);
    if (id && this.panier.length > 0) {
      const panierData = {
        adresseLivraison: this.adresse,
        clientId: id
      };
      const panierId = await this.serviceService.postPanier(panierData);

      for (const item of this.panier) {
        const detailsPanier = {
          panierId: panierId,
          produitId: item.produit._id,
          qte: item.quantity
        };
        await this.serviceService.postDetailsPanier(detailsPanier);
      }

      this.panier = [];  
      this.adresse = "";
      this.closePanier();
    }
    }
  }

  panierOuvert: boolean = false;

  openPanier(): void {
    if (this.panier.length > 0) {
      this.panierOuvert = true;
    }else{
      alert("Le panier est vide");
    }
  }

  closePanier(): void {
    this.panierOuvert = false;
  }

}
