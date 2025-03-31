import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/utiles/service.service';

@Component({
  selector: 'app-services',
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit{
  services: any[] = [];

  constructor(private service: ServiceService, private router: Router){}

  ngOnInit(){
    this.fetch();  
  }

  async fetch() {
    try {
      this.services = await this.service.getServices();
    } catch (error) {
      this.router.navigate(["error/"]) 
    }
  }
}