import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { NavbarComponent } from '../components/navbar-admin/navbar.component';

@Component({
  selector: 'app-admin',
  imports: [SidebarComponent, NavbarComponent, RouterOutlet, FooterComponent, CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  constructor() {}

  ngOnInit(): void {}
}
