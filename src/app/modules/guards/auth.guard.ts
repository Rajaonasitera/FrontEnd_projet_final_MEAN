import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ServiceService } from 'src/app/utiles/service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private service: ServiceService) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    try {
      const token = localStorage.getItem('Token'); 
    if (token) {
      const type = await this.service.getType(); 
      if (state.url !== '/') {
        this.router.navigate(['/auth/sign-up']);
        return false;
      }else{
        if (String(type) === '1') {
          this.router.navigate(['/client']);
        } else {
          this.router.navigate(['/admin']);
        }
        return false; 
      }
    }
    return true;
    } catch (error) {
      
    }
    
  }
}
