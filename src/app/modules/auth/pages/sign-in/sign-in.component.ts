import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { ServiceService } from 'src/app/utiles/service.service';

@Component({
  selector: 'app-sign-in',
  standalone: true, 
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  imports: [FormsModule, ReactiveFormsModule, RouterLink, AngularSvgIconModule, NgIf, ButtonComponent, NgClass],
})
export class SignInComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  showPassword = false;

  constructor(private fb: FormBuilder, private router: Router, private service: ServiceService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', Validators.required], 
      password: ['', Validators.required]
    });
  }

  get f() {
    return this.form.controls;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  async onSubmit() {
    this.submitted = true;
    if (this.form.invalid) return;

    const token = await this.service.check(this.form.get('email')?.value ,this.form.get('password')?.value);

    localStorage.setItem("Token", token.token);
    console.log(token, "hehehe");
    
    if (this.form.get('telephone')?.value === "1") {
      localStorage.setItem("type", "1");
    }
    if (this.form.get('telephone')?.value === "2") {
      localStorage.setItem("type", "2");
    }
    if (this.form.get('telephone')?.value === "3") {
      localStorage.setItem("type", "3");
    }

    localStorage.setItem("telephone", this.form.get('telephone')?.value);
    
    console.log("Connexion réussie");
    
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.form.reset(); 
  }
}
