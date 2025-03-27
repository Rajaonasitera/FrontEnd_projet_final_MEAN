import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = !!localStorage.getItem('telephone'); 
    if (!isLoggedIn) {
      this.router.navigate(['/auth/sign-up']);
      return false;
    }
    return true;
  }
}
