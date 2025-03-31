import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ServiceService } from 'src/app/utiles/service.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule, AngularSvgIconModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  name: string = '';
  email: string = '';
  telephone: string = '';
  password: string = '';
  confirmPassword: string = '';
  acceptTerms: boolean = false;
  showPassword: boolean = false;

  constructor(private serviceService: ServiceService, private router: Router) {}

  ngOnInit(): void {}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  async onSubmit() {
    if (!this.validateForm()) return;
    
    const userData = {
      name: this.name,
      email: this.email,
      telephone: this.telephone,
      password: this.password
    };

    try {
      await this.serviceService.createUsers(userData.name, userData.email, userData.telephone, userData.password);
      this.router.navigate(["/auth/sign-in"]);
    } catch (error) {
      
    }

  }

  private validateForm(): boolean {
    if (!this.name || !this.email || !this.telephone || !this.password || !this.confirmPassword) {
      alert('Veuillez remplir tous les champs');
      return false;
    }

    if (this.password !== this.confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return false;
    }

    if (!this.acceptTerms) {
      alert('Veuillez accepter les conditions générales');
      return false;
    }

    return true;
  }

  calculatePasswordStrength(): void {
  }
}