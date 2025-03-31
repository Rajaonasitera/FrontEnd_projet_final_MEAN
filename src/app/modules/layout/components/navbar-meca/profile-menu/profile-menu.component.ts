import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ThemeService } from '../../../../../core/services/theme.service';
import { ClickOutsideDirective } from '../../../../../shared/directives/click-outside.directive';
import { ServiceService } from 'src/app/utiles/service.service';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.css'],
  imports: [ClickOutsideDirective, NgClass, RouterLink, AngularSvgIconModule, CommonModule],
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          opacity: 1,
          transform: 'translateY(0)',
          visibility: 'visible',
        }),
      ),
      state(
        'closed',
        style({
          opacity: 0,
          transform: 'translateY(-20px)',
          visibility: 'hidden',
        }),
      ),
      transition('open => closed', [animate('0.2s')]),
      transition('closed => open', [animate('0.2s')]),
    ]),
  ],
})
export class ProfileMenuComponent implements OnInit {
  public isOpen = false;
  public isConnected = false;
  public user: any = null;
  public profileMenu = [
    {
      title: 'Profile',
      icon: './assets/icons/heroicons/outline/user-circle.svg',
      link: '/client/profile',
    }
  ];

  deconnecter() {
    localStorage.removeItem("Token");
    this.router.navigate(['/auth']);
  }

  constructor(public themeService: ThemeService, public router: Router, private service: ServiceService) { }

  ngOnInit(): void {
    const token = localStorage.getItem("Token");
    if (token) {
    this.fetch();  
    this.isConnected = true;
      }
  }

async fetch() {
  try {
  const id = await this.service.getIdClient();
  this.user = await this.service.getClient(id);
  } catch (error) {
    this.router.navigate(["error/"]) 
  }
}

  public toggleMenu(): void {
    this.isOpen = !this.isOpen;
  }
}
