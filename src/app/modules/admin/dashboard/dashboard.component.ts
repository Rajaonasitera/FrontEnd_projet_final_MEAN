import { Component } from '@angular/core';
import { NftChartCardComponent } from '../../dashboard/components/nft/nft-chart-card/nft-chart-card.component';

@Component({
  selector: 'app-dashboard',
  imports: [NftChartCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  getNouveauxClients() {
    // Logique pour identifier les nouveaux clients
    return 3; // Exemple
  }
}
