import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ServiceService } from 'src/app/utiles/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  suiviRendezVous: any[] = [];
  paniersClient: any[] = [];
  panierSelectionne: any = null;
  panierSelectionneDetails: any[] = [];
  rendezVousSelectionne: any = null;
  rendezVousReparations: any[] = [];
  clientId: string = "";
  user: any = null;

  constructor(private serviceService: ServiceService, private router: Router){}

  async ngOnInit() {
    this.fetch();  
  }

  async fetch() {
    try {
      const token = localStorage.getItem("Token");
      if (token) {
        this.clientId = await this.serviceService.getIdClient(token);
        this.paniersClient = await this.serviceService.getPanierByClient(this.clientId);
        this.suiviRendezVous = await this.serviceService.getRendezVousByClient(this.clientId);
        for (let rdv of this.suiviRendezVous) {
          if (rdv.personnel !== "En attente") {
            rdv.mecanicien = await this.serviceService.getClient(rdv.personnel);
          }
        }
        this.user = await this.serviceService.getClient(this.clientId);
      }
    } catch (error) {
      this.router.navigate(["error/error-server"]); 
    }
  }

  async afficherDetails(panier: any) {
    this.panierSelectionne = panier;
    this.panierSelectionneDetails = await this.serviceService.getDetailsPanierByPanier(panier._id);
  }

  async afficherDetailsRendezVous(rendezVous: any) {
    this.rendezVousSelectionne = rendezVous;
    try {
      this.rendezVousReparations = await this.serviceService.getReparations(rendezVous._id);
    } catch (error) {
      this.rendezVousReparations = [];
      this.router.navigate(["error/error-server"]);
    }
  }

  getTotal(detail: any[]) {
    let total = 0;
    for (let i = 0; i < detail.length; i++) {
      total = total + (detail[i].produitId.prixvente * detail[i].qte); 
    }
    return total;
  }

  getTotalReparations(reparations: any[]) {
    return reparations.reduce((sum, reparation) => sum + reparation.prix, 0);
  }

  fermerModal() {
    this.panierSelectionne = null;
  }

  fermerModalRendezVous() {
    this.rendezVousSelectionne = null;
    this.rendezVousReparations = [];
  }

  async genererFacture(panier: any, detail: any[]) {
    const token = localStorage.getItem("Token");
    if (token) {
      const id = await this.serviceService.getIdClient(token);
      const user: any = await this.serviceService.getClient(id);

      const doc = new jsPDF();

      fetch('assets/icons/logo.png')
        .then(response => response.blob())
        .then(blob => {
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            const logo = reader.result as string;

            doc.addImage(logo, 'PNG', 10, 10, 40, 30);

            doc.setFontSize(18);
            doc.text('Facture', 105, 35, { align: 'center' });

            doc.setFontSize(12);
            doc.text(`Date: ${(new Date(panier.daty)).toLocaleDateString()}`, 10, 50);
            doc.text(`Client: ${user.name}`, 10, 60);
            doc.text(`Numéro de facture: INV-${panier._id}`, 10, 70);

            doc.setLineWidth(0.5);
            doc.line(10, 75, 200, 75);

            autoTable(doc, {
              startY: 80,
              head: [['Produit', 'Quantité', 'Prix Unitaire', 'Total']],
              body: detail.map((produit: any) => [
                produit.produitId.designation,
                produit.qte,
                `${produit.produitId.prixvente} Ar`,
                `${produit.qte * produit.produitId.prixvente} Ar`
              ]),
              theme: 'grid',
              styles: { fontSize: 10, cellPadding: 3 },
            });

            const finalY = (doc as any).lastAutoTable.finalY || 100;
            doc.setFontSize(14);
            doc.text(`Total: ${this.getTotal(detail)} Ar`, 150, finalY + 10);

            doc.save(`Facture_${(new Date(panier.daty)).toLocaleDateString()}.pdf`);
          };
        })
        .catch(error => console.error('Erreur de chargement du logo:', error));
    }
  }

  async genererFactureReparation(rendezVous: any, reparations: any[]) {
    const token = localStorage.getItem("Token");
    if (token) {
      const id = await this.serviceService.getIdClient(token);
      const user: any = await this.serviceService.getClient(id);

      const doc = new jsPDF();

      fetch('assets/icons/logo.png')
        .then(response => response.blob())
        .then(blob => {
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            const logo = reader.result as string;

            doc.addImage(logo, 'PNG', 10, 10, 40, 30);

            doc.setFontSize(18);
            doc.text('Facture de Réparation', 105, 35, { align: 'center' });

            doc.setFontSize(12);
            doc.text(`Date: ${(new Date(rendezVous.date)).toLocaleDateString()}`, 10, 50);
            doc.text(`Client: ${user.name}`, 10, 60);
            doc.text(`Voiture: ${rendezVous._id}`, 10, 70);
            doc.text(`Numéro de facture: REP-${rendezVous._id}`, 10, 80);

            doc.setLineWidth(0.5);
            doc.line(10, 75, 200, 75);

            autoTable(doc, {
              startY: 90,
              head: [['Service', 'date', 'Prix']],
              body: reparations.map((reparation: any) => [
                reparation.description,
                reparation.duree,
                `${reparation.prixvente} Ar`
              ]),
              theme: 'grid',
              styles: { fontSize: 10, cellPadding: 3 },
            });

            const finalY = (doc as any).lastAutoTable.finalY || 100;
            doc.setFontSize(14);
            doc.text(`Total: ${this.getTotalReparations(reparations)} Ar`, 150, finalY + 10);

            doc.save(`Facture_Reparation_${(new Date(rendezVous.date)).toLocaleDateString()}.pdf`);
          };
        })
        .catch(error => console.error('Erreur de chargement du logo:', error));
    }
  }
}