import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';

@Component({
  selector: 'app-error-server',
  imports: [AngularSvgIconModule, ButtonComponent],
  templateUrl: './error-server.component.html',
  styleUrl: './error-server.component.css',
})
export class ErrorServerComponent {
  constructor(private router: Router) {}

  goToHomePage() {
    this.router.navigate(['/']);
  }
}
