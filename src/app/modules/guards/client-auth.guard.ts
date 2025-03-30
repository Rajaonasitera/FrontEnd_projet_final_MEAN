import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ServiceService } from 'src/app/utiles/service.service';
import { ErrorService } from '../error/error.service';

@Injectable({
  providedIn: 'root',
})
export class ClientAuthGuard implements CanActivate {
  constructor(private router: Router, private service: ServiceService, private error: ErrorService) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    try {
      const token = localStorage.getItem('Token'); 
    if (token) {
      const type = await this.service.getType(); 
      if (type !== 1) {
        this.error.setError("Oops, Vous n'avez pas accès!")
        this.router.navigate(['/errors']);
        return false;
      }
    }
    return true;
    } catch (error) {
      
    }
    
  }
}
