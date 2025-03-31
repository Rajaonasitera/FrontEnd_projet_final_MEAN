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

  constructor(private serviceService: ServiceService, private router: Router){}

  async ngOnInit() {
    this.fetch();  
  }

  async fetch() {
    try {
      this.clientId = await this.serviceService.getIdClient();
      this.paniersClient = await this.serviceService.getPanierByClient(this.clientId);
      this.suiviRendezVous = await this.serviceService.getRendezVousByClient(this.clientId);
    } catch (error) {
      this.router.navigate(["error/"]) 
    }
  }

  async afficherDetails(panier: any) {
    this.panierSelectionne = panier;
    this.panierSelectionneDetails = await this.serviceService.getDetailsPanierByPanier(panier._id);
  }

  async afficherDetailsRendezVous(rendezVous: any) {
    this.rendezVousSelectionne = rendezVous;
    try {
      // this.rendezVousReparations = await this.serviceService.getReparationsByRendezVous(rendezVous._id);
    } catch (error) {
      this.rendezVousReparations = [];
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
    const id = await this.serviceService.getIdClient();
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

  async genererFactureReparation(rendezVous: any, reparations: any[]) {
    const id = await this.serviceService.getIdClient();
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
          doc.text(`Numéro de facture: REP-${rendezVous._id}`, 10, 70);

          doc.setLineWidth(0.5);
          doc.line(10, 75, 200, 75);

          autoTable(doc, {
            startY: 80,
            head: [['Description', 'Durée (heures)', 'Prix']],
            body: reparations.map((reparation: any) => [
              reparation.description,
              reparation.duree,
              `${reparation.prix} Ar`
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