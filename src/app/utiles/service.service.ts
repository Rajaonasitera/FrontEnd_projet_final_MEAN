import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private apiUrl = environment.apiUrl+'/mean/';
  private token = localStorage.getItem("Token");

  constructor(private http: HttpClient) {}

  get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}${endpoint}`);
  }
  post<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}${endpoint}`, data);
  }

  put<T>(endpoint: string, data: any): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}${endpoint}`, data);
  }

  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}${endpoint}`);
  }

  async getClients(): Promise<any[]> {
    return firstValueFrom(this.http.get<any[]>(`${this.apiUrl}users`));
  }

  async getProduits(): Promise<any[]> {
    return firstValueFrom(this.http.get<any[]>(`${this.apiUrl}produits`));
  }

  async getVoitures(): Promise<any[]> {
    return firstValueFrom(this.http.get<any[]>(`${this.apiUrl}voitures`));
  }

  async getReparations(): Promise<any[]> {
    return firstValueFrom(this.http.get<any[]>(`${this.apiUrl}reparation`));
  }

  async getRendezVous(): Promise<any[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return firstValueFrom(this.http.get<any[]>(`${this.apiUrl}rdv`, { headers }));
  }

  async postClient(client: any): Promise<any> {
    return firstValueFrom(this.http.post<any>(`${this.apiUrl}clients`, client));
  }

  async postProduit(produit: any): Promise<any> {
    return firstValueFrom(this.http.post<any>(`${this.apiUrl}produits`, produit));
  }

  async postVoiture(produit: any): Promise<any> {
    return firstValueFrom(this.http.post<any>(`${this.apiUrl}voitures`, produit));
  }

  async postReparation(produit: any): Promise<any> {
    return firstValueFrom(this.http.post<any>(`${this.apiUrl}reparation`, produit));
  }

  async postRendezVous(produit: any): Promise<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return firstValueFrom(this.http.post<any>(`${this.apiUrl}rdv`, produit, { headers }));
  }

  async getToken(credentials: any): Promise<string> {
    const response = await firstValueFrom(this.http.post<{ token: string }>(`${this.apiUrl}auth/login`, credentials));
    return response.token;
  }

  async getType(): Promise<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return await firstValueFrom(this.http.get<any>(`${this.apiUrl}getRole`, { headers }));
  }

  async check(email: string, password: string): Promise<any> {
    const user = JSON.stringify({ email: email, password: password });
    const headers= new HttpHeaders({ 'Content-Type': 'application/json' });
    return firstValueFrom(this.http.post<any>(`${this.apiUrl}testLogin`, user, { headers }));
  }

  async createUsers(name: string, email: string, numero: string, password: string){
    const user = {
      name: name,
      email: email,
      telephone: numero,
      password: password
    }
    console.log(user, "userrr");
    
    return firstValueFrom(this.http.post<any>(`${this.apiUrl}register`, user))
  }
}
