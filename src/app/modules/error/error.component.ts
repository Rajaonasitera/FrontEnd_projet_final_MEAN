import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ErrorService } from './error.service';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';

@Component({
  selector: 'app-error',
  imports: [RouterOutlet, ButtonComponent],
  templateUrl: './error.component.html',
})
export class ErrorComponent implements OnInit {
  errorMessage: string | null = "We can't find that page. You can go back to the previous page or go to the homepage.";

  
  constructor(private errorService: ErrorService, private router: Router) {}

  ngOnInit(): void {
    this.errorService.error$.subscribe((error) => {
      this.errorMessage = error; 
    });
  console.log("atoooo");
}

  goToHomePage() {
    this.router.navigate(['/']);
  }
  
}
