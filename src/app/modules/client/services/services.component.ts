import { Component, OnInit } from '@angular/core';
import { NftHeaderComponent } from '../../dashboard/components/nft/nft-header/nft-header.component';
import { NftDualCardComponent } from '../../dashboard/components/nft/nft-dual-card/nft-dual-card.component';
import { NftSingleCardComponent } from '../../dashboard/components/nft/nft-single-card/nft-single-card.component';
import { NftChartCardComponent } from '../../dashboard/components/nft/nft-chart-card/nft-chart-card.component';
import { NftAuctionsTableComponent } from '../../dashboard/components/nft/nft-auctions-table/nft-auctions-table.component';
import { Nft } from '../../dashboard/models/nft';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  imports: [
    NftHeaderComponent,
    NftDualCardComponent,
    NftSingleCardComponent,
    NftChartCardComponent,
    NftAuctionsTableComponent,
  ],
  styleUrl: './services.component.css'
})
export class ServicesComponent implements OnInit {
  nft: Array<Nft>;

  constructor() {
    this.nft = [
      {
        id: 34356771,
        title: 'Girls of the Cartoon Universe',
        creator: 'Jhon Doe',
        instant_price: 4.2,
        price: 187.47,
        ending_in: '06h 52m 47s',
        last_bid: 0.12,
        image: './assets/images/img-01.jpg',
        avatar: './assets/avatars/avt-01.jpg',
      },
      {
        id: 34356772,
        title: 'Pupaks',
        price: 548.79,
        last_bid: 0.35,
        image: './assets/images/img-02.jpg',
      },
      {
        id: 34356773,
        title: 'Seeing Green collection',
        price: 234.88,
        last_bid: 0.15,
        image: './assets/images/img-03.jpg',
      },
    ];
  }

  ngOnInit(): void {}
}
