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
export class SignInMecaComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  showPassword = false;

  constructor(private fb: FormBuilder, private router: Router, private service: ServiceService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['meca@gmail.com', Validators.required], 
      password: ['12345', Validators.required]
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
    let type;
    if (token.token) {
      type = await this.service.getType(token.token);
    }

    if (type) {
      if (Number(type) === 1) {
        this.router.navigate(['/client/']);
        console.log("heee");
        
      }
      if (Number(type) === 50) {
        this.router.navigate(['/meca/']);
      }
      if (Number(type) === 100) {
        this.router.navigate(['/admin/']);
      }
    }
    
   

  }

  ngOnDestroy(): void {
    this.form.reset(); 
  }
}
