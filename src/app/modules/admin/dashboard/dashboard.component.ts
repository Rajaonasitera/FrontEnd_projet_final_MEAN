import { Component, OnInit } from '@angular/core';
import { NftChartCardComponent } from '../../dashboard/components/nft/nft-chart-card/nft-chart-card.component';
import { ServiceService } from 'src/app/utiles/service.service';

@Component({
  selector: 'app-dashboard',
  imports: [NftChartCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  totalRdv: string = "";
  rdvPending: string = "";
  rdvLoading: string = "";
  rdvAnnule: string = "";
  rdvDone: string = "";

  constructor(private serviceService: ServiceService){}

  ngOnInit(): void {
      this.fetch();
  }

  async fetch() {
    this.totalRdv = (await this.serviceService.getCountAllRdv()).count;
    this.rdvPending = (await this.serviceService.getCountRdvPending()).count;
    this.rdvLoading = (await this.serviceService.getCountRdvLoading()).count;
    this.rdvAnnule = (await this.serviceService.getCountRdvAnnule()).count;
    this.rdvDone = (await this.serviceService.getCountRdvDone()).count;
    
  }
}
