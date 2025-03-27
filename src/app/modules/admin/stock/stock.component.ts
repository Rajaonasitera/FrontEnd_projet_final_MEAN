import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-stock',
  imports: [CommonModule],
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.css'
})
export class StockComponent {
  stockProduits = [
    {
      id: 1,
      nom: 'Huile moteur 5W30',
      categorie: 'Lubrifiant',
      prix: 29.99,
      stock: 15,
    },
    {
      id: 2,
      nom: 'Batterie VARTA 12V 60Ah',
      categorie: 'Batterie',
      prix: 89.99,
      stock: 8,
    },
    {
      id: 3,
      nom: 'Filtre à huile BOSCH',
      categorie: 'Filtration',
      prix: 12.50,
      stock: 20,
    },
    {
      id: 4,
      nom: 'Plaquettes de frein BREMBO',
      categorie: 'Freinage',
      prix: 49.99,
      stock: 5,
    },
    {
      id: 5,
      nom: 'Bougies d’allumage NGK',
      categorie: 'Électricité',
      prix: 9.99,
      stock: 30,
    },
  ];

  ajouterStock(produit: any) {
    produit.stock += 1;
  }

  reduireStock(produit: any) {
    if (produit.stock > 0) {
      produit.stock -= 1;
    }
  }
  ngOnInit() {}
}

