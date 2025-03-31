import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../components/navbar-meca/navbar.component';
import { SidebarComponent } from '../components/sidebar-meca/sidebar.component';

@Component({
  selector: 'app-meca',
  imports: [SidebarComponent, NavbarComponent, RouterOutlet, FooterComponent, CommonModule],
  templateUrl: './meca.component.html',
  styleUrl: './meca.component.css'
})
export class MecaComponent {
  constructor() {}

  ngOnInit(): void {}
}
