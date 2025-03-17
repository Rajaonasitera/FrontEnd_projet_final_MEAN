import { Component, OnInit } from '@angular/core';
import { ClientRoutingModule } from './client-routing.module';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-client',
  imports: [RouterOutlet],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
