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
  panierOuvert: boolean = false;

  constructor(private serviceService: ServiceService, private router: Router) {}

  ngOnInit() {
    this.fetch();
  }

  async fetch() {
    try {
      this.produits = await this.serviceService.getArticles();
      for (let produit of this.produits) {
        produit.qte = await this.serviceService.getStock(produit._id);
      }
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
    if (!this.selectedProduit) return;

    try {
      const stockDisponible = await this.serviceService.getStock(this.selectedProduit._id);
      
      const dansPanier = this.panier.find(item => item.produit._id === this.selectedProduit._id);
      const qteDejaDansPanier = dansPanier ? dansPanier.quantity : 0;
      
      if (this.quantity + qteDejaDansPanier > stockDisponible) {
        const qteRestante = stockDisponible - qteDejaDansPanier;
        if (qteRestante <= 0) {
          alert("Ce produit est épuisé ou déjà en quantité maximale dans votre panier.");
        } else {
          alert(`Quantité insuffisante en stock. Vous pouvez ajouter jusqu'à ${qteRestante} unité(s) supplémentaires.`);
        }
        return;
      }

      if (dansPanier) {
        dansPanier.quantity += this.quantity;
      } else {
        this.panier.push({ produit: this.selectedProduit, quantity: this.quantity });
      }
      
      this.closeModal();
    } catch (error) {
      console.error("Erreur lors de la vérification du stock:", error);
      alert("Une erreur est survenue lors de la vérification du stock.");
    }
  }

  getTotalItems() {
    return this.panier.reduce((total, item) => total + item.quantity, 0);
  }

  async confirmerAchat() {
    const token = localStorage.getItem("Token");
    if (!token) {
      alert("Vous devez vous connecter à votre compte pour finaliser votre achat.");
      this.router.navigate(["/auth"]);
      return;
    }

    if (this.panier.length === 0) {
      alert("Votre panier est vide.");
      return;
    }

    try {
      for (const item of this.panier) {
        const stockDisponible = await this.serviceService.getStock(item.produit._id);
        if (item.quantity > stockDisponible) {
          alert(`Désolé, le produit "${item.produit.nom}" n'a plus assez de stock. Quantité disponible: ${stockDisponible}`);
          return;
        }
      }

      const id = await this.serviceService.getIdClient(token);
      if (!id) {
        alert("Erreur lors de la récupération de votre compte.");
        return;
      }

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
      alert("Votre achat a été confirmé avec succès !");
    } catch (error) {
      console.error("Erreur lors de la confirmation de l'achat:", error);
      alert("Une erreur est survenue lors de la confirmation de votre achat.");
    }
  }

  openPanier(): void {
    if (this.panier.length > 0) {
      this.panierOuvert = true;
    } else {
      alert("Le panier est vide");
    }
  }

  closePanier(): void {
    this.panierOuvert = false;
  }

  supprimerDuPanier(index: number): void {
    this.panier.splice(index, 1);
    if (this.panier.length === 0) {
      this.closePanier();
    }
  }

  modifierQuantite(index: number, change: number): void {
    const newQuantity = this.panier[index].quantity + change;
    if (newQuantity > 0) {
      this.panier[index].quantity = newQuantity;
    } else {
      this.supprimerDuPanier(index);
    }
  }
}