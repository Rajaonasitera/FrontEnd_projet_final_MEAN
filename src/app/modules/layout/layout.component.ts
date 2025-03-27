import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  imports: [SidebarComponent, NavbarComponent, RouterOutlet, FooterComponent],
})
export class LayoutComponent implements OnInit {
  private mainContent: HTMLElement | null = null;
  isAdmin: boolean = false;
  isClient: boolean = false;
  isConnected: boolean = false;
  init: boolean = true;
  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (this.mainContent) {
          this.mainContent!.scrollTop = 0;
        }
      }
    });
  }

  ngOnInit(): void {
    this.mainContent = document.getElementById('main-content');
    if (localStorage.getItem("telephone")=="12") {
      this.isClient = true;
    }
    else{
      this.isAdmin = true;
    }
    init: false;
  }
}
