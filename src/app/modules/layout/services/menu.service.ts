import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Menu } from 'src/app/core/constants/menu';
import { MenuItem, SubMenuItem } from 'src/app/core/models/menu.model';
import { ServiceService } from 'src/app/utiles/service.service';

@Injectable({
  providedIn: 'root',
})
export class MenuService implements OnDestroy {
  private _showSidebar = signal(true);
  private _showMobileMenu = signal(false);
  private _pagesMenu = signal<MenuItem[]>([]);
  private _subscription = new Subscription();
  private isClient = true;
  private isAdmin = false;
  private isMeca = false;

  constructor(private router: Router, private service: ServiceService) {
    const token = localStorage.getItem("Token"); 
    if (token) {
     this.setUserType(token);
    }
    this._pagesMenu.set(
      Menu.pages.filter(page => 
        (this.isAdmin && page.isAdmin) ||
        (this.isClient && page.isClient) ||
        (this.isMeca && page.isMeca)
      )
    );
  
    let sub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this._pagesMenu().forEach((menu) => {
          let activeGroup = false;
  
          if (menu.route) {
            menu.active = this.isActive(menu.route);
            activeGroup = menu.active;
          }
  
          // menu.items?.forEach((subMenu) => {
          //   const active = this.isActive(subMenu.route);
          //   subMenu.expanded = active;
          //   subMenu.active = active;
          //   if (active) activeGroup = true;
  
          //   if (subMenu.children?.length) {
          //     this.expand(subMenu.children);
          //   }
          // });
  
          menu.active = activeGroup;
        });
      }
    });
  
    this._subscription.add(sub);
  }

  async setUserType(token: string) {
    try {
      const type = await this.getType();
  
      this.isClient = String(type) === "1";
      this.isAdmin = String(type) === "100";
      this.isMeca = String(type) === "50";
    } catch (error) {
      console.error("Erreur lors de la récupération du type d'utilisateur:", error);
    }
  }

  async getType(): Promise<any>{
    try {
      const type = await this.service.getType();
      return type;
    } catch (error) {
      
    }
  }

  get showSideBar() {
    return this._showSidebar();
  }
  get showMobileMenu() {
    return this._showMobileMenu();
  }
  get pagesMenu() {
    return this._pagesMenu();
  }

  set showSideBar(value: boolean) {
    this._showSidebar.set(value);
  }
  set showMobileMenu(value: boolean) {
    this._showMobileMenu.set(value);
  }

  public toggleSidebar() {
    this._showSidebar.set(!this._showSidebar());
  }

  public toggleMenu(menu: any) {
    this.showSideBar = true;
    menu.expanded = !menu.expanded;
  }

  public toggleSubMenu(submenu: SubMenuItem) {
    submenu.expanded = !submenu.expanded;
  }

  private expand(items: Array<any>) {
    items.forEach((item) => {
      item.expanded = this.isActive(item.route);
      if (item.children) this.expand(item.children);
    });
  }

  private isActive(instruction: any): boolean {
    return this.router.isActive(this.router.createUrlTree([instruction]), {
      paths: 'exact',
      queryParams: 'ignored',
      fragment: 'ignored',
      matrixParams: 'ignored',
    });
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
