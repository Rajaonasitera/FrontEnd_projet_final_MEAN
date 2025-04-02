import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/utiles/service.service';

@Component({
  selector: 'app-rendez-vous',
  templateUrl: './rendez-vous.component.html',
  styleUrls: ['./rendez-vous.component.css'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})
export class RendezVousComponent {
  rendezVousForm: FormGroup;
  minDate: Date;
  selectedServices: number[] = [];
  availableTimeSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];

  constructor(private fb: FormBuilder, private serviceService: ServiceService, private router: Router) {
    this.minDate = new Date();
    this.rendezVousForm = this.fb.group({
      description: ['', Validators.required],
      date: ['', Validators.required],
      heure: ['', Validators.required],
      lieu: ['', Validators.required]
    });
  }

  async onSubmit(){
    const token = localStorage.getItem("Token");
    if (token) {
      const clientId = await this.serviceService.getIdClient(token);
      const formData = {
        ...this.rendezVousForm.value,
        client: clientId,
        personnel: "En attente",
        remarque: "",
        etat: 'En attente'
      };
      try {
        console.log('Rendez-vous soumis:', formData);
        await this.serviceService.postRendezVous(formData, token);
        this.router.navigate(["/client/profile"]);
      } catch (error) {
        this.router.navigate(["error/error-server"]);
      }
    }
    
  }
}