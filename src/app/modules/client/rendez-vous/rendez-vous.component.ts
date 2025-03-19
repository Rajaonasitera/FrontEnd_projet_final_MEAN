import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-rendez-vous',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './rendez-vous.component.html',
  styleUrl: './rendez-vous.component.css'
})
export class RendezVousComponent {
  rdvForm: FormGroup;
  services = [
    { id: 1, nom: 'Réparation moteur' },
    { id: 2, nom: 'Changement de pneus' },
  ];

  constructor(private fb: FormBuilder) {
    this.rdvForm = this.fb.group({
      dateRdv: ['', Validators.required],
      voiture: ['', Validators.required],
      service: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.rdvForm.valid) {
      const formData = this.rdvForm.value;
      console.log(formData);
    } else {
      console.log('Le formulaire est invalide');
    }
  }
  
  ngOnInit(): void {}
}
