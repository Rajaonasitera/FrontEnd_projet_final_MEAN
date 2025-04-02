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
    if (!token) {
      this.router.navigate(['/client']);
      return true;
    }
    if (token) {
      if (state.url !== '/') {
        this.router.navigate(['/auth/sign-up']);
        return false;
      }else{
        const type = await this.service.getType(token);
        if (type) {
          if (Number(type) === 1) {
            this.router.navigate(['/client']);
          } 
          else if (Number(type) === 100){
            this.router.navigate(['/admin']);
          }
          else if (Number(type) === 50){
            this.router.navigate(['/meca']);
          }
        return true; 
      }
        
      }
    }
    return true;
    } catch (error) {
      this.router.navigate(["error/error-server"]);
    }
    
  }
}
