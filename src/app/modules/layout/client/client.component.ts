import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { FooterComponent } from '../components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { BottomNavbarComponent } from '../components/bottom-navbar/bottom-navbar.component';

@Component({
  selector: 'app-client',
  imports: [NavbarComponent, RouterOutlet, FooterComponent, CommonModule, BottomNavbarComponent],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent {
  constructor() {}

  ngOnInit(): void {}
}
