import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ClientComponent } from './client/client.component';
import { AdminComponent } from './admin/admin.component';
import { ServiceService } from 'src/app/utiles/service.service';
import { HttpClientModule } from '@angular/common/http';
import { MenuService } from './services/menu.service';
import { AuthGuard } from '../guards/auth.guard';

@Component({
  selector: 'app-layout',
  standalone: true,
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  imports: [CommonModule, ClientComponent, AdminComponent],
  providers:[MenuService]
})
export class LayoutComponent implements OnInit {
  private mainContent: HTMLElement | null = null;
  isAdmin: boolean = false;
  isClient: boolean = true;
  isMeca: boolean = false;
  isConnected: boolean = false;
  token: string | null = localStorage.getItem("Token");

  constructor(private router: Router, private service: ServiceService) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (this.mainContent) {
          this.mainContent.scrollTop = 0;
        }
        if (this.token) {
          this.checkUserType();
        }
      }
    });
  }

  ngOnInit(): void {
    this.mainContent = document.getElementById('main-content');
    if (this.token) {
      this.checkUserType();
    }
  }

  async checkUserType() {
    try {
      if (this.token) {
        const type = await this.service.getType();
      this.isClient = String(type) === "1";
      this.isMeca = String(type) === "50";
      this.isAdmin = String(type) === "100";

      if (!this.isAdmin && !this.isClient && !this.isMeca) {
        localStorage.removeItem("token");
        this.router.navigate(['/auth/sign-in']);
      }else{
        this.isConnected = true;
      }
      }
      
    } catch (error) {
      
    }
    
  }
}
