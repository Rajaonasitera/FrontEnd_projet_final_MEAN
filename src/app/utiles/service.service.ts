import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private apiUrl = environment.apiUrl+'/mean/';

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

  async getMecaniciens(): Promise<any[]> {
    return firstValueFrom(this.http.get<any[]>(`${this.apiUrl}users/allpersonnel`));
  }

  async getProduits(): Promise<any[]> {
    return firstValueFrom(this.http.get<any[]>(`${this.apiUrl}produits`));
  }

  async getProduit(idProduit:string): Promise<any> {
    return firstValueFrom(this.http.get<any>(`${this.apiUrl}produits/byId/`+idProduit));
  }
  
  async getArticles(): Promise<any[]> {
    return firstValueFrom(this.http.get<any[]>(`${this.apiUrl}produits/allArticles`));
  }

  async getServices(): Promise<any[]> {
    return firstValueFrom(this.http.get<any[]>(`${this.apiUrl}produits/allServices`));
  }

  async getStocks(): Promise<any[]> {
    return firstValueFrom(this.http.get<any[]>(`${this.apiUrl}stock`));
  }

  async getStock(idProduit: string): Promise<any> {
    return firstValueFrom(this.http.get<any>(`${this.apiUrl}stock/`+idProduit));
  }

  async getNbDispoStock(idProduit: string): Promise<any[]> {
    return firstValueFrom(this.http.get<any[]>(`${this.apiUrl}stock/`+idProduit));
  }

  async checkStock(idProduit: string, quantite: number): Promise<any[]> {
    const body = {
      produitId: idProduit,
      qte: quantite
    }
    return firstValueFrom(this.http.post<any[]>(`${this.apiUrl}stock/check-stock`, body));
  }

  async postStock(stock: any): Promise<any> {
    return firstValueFrom(this.http.post<any>(`${this.apiUrl}stock`, stock));
  }

  async getVoitures(): Promise<any[]> {
    return firstValueFrom(this.http.get<any[]>(`${this.apiUrl}voitures`));
  }

  async getVoituresByClient(idClient: string): Promise<any[]> {
    return firstValueFrom(this.http.get<any[]>(`${this.apiUrl}voitures/byClient/`+idClient));
  }

  async getReparations(idRdv: string): Promise<any[]> {
    return firstValueFrom(this.http.get<any[]>(`${this.apiUrl}reparation/byRdv/`+idRdv));
  }

  async getRendezVous(): Promise<any[]> {
    const token = localStorage.getItem("Token");
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return firstValueFrom(this.http.get<any[]>(`${this.apiUrl}rdv`));
  }

  async getRendezVousByClient(idClient: string): Promise<any[]> {
    const token = localStorage.getItem("Token");
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return firstValueFrom(this.http.get<any[]>(`${this.apiUrl}rdv/byClient/`+idClient, { headers }));
  }

  async getRendezVousByMeca(idMeca: string): Promise<any[]> {
    const token = localStorage.getItem("Token");
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return firstValueFrom(this.http.get<any[]>(`${this.apiUrl}rdv/byPersonnel/`+idMeca, { headers }));
  }

  async getPanierByClient(idClient: string): Promise<any[]> {
    return firstValueFrom(this.http.get<any[]>(`${this.apiUrl}panier/byClient/`+idClient));
  }

  async getClient(idClient: string): Promise<any> {
    return firstValueFrom(this.http.get<any>(`${this.apiUrl}users/userId/`+idClient));
  }

  async getDetailsPanierByPanier(idPanier: string): Promise<any[]> {
    return firstValueFrom(this.http.get<any[]>(`${this.apiUrl}detailsPanier/`+idPanier));
  }

  async postClient(client: any): Promise<any> {
    return firstValueFrom(this.http.post<any>(`${this.apiUrl}clients`, client));
  }

  async postProduit(produit: any): Promise<any> {
    return firstValueFrom(this.http.post<any>(`${this.apiUrl}produits`, produit));
  }

  async postVoiture(voiture: any): Promise<any> {
    return firstValueFrom(this.http.post<any>(`${this.apiUrl}voitures`, voiture));
  }

  async postPanier(panier: any): Promise<any> {
    return firstValueFrom(this.http.post<any>(`${this.apiUrl}panier`, panier));
  }

  async postDetailsPanier(detail: any): Promise<any> {
    return firstValueFrom(this.http.post<any>(`${this.apiUrl}detailsPanier`, detail));
  }

  async postReparation(reparation: any): Promise<any> {
    return firstValueFrom(this.http.post<any>(`${this.apiUrl}reparation`, reparation));
  }

  async postRendezVous(produit: any, token: string): Promise<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return firstValueFrom(this.http.post<any>(`${this.apiUrl}rdv`, produit, { headers }));
  }

  async updateRendezVous(rdv: any, token: string | null, id: string): Promise<any>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return firstValueFrom(this.http.put<any>(`${this.apiUrl}rdv/update/`+id, rdv, { headers }));
  }

  // async getToken(credentials: any): Promise<string> {
  //   const response = await firstValueFrom(this.http.post<{ token: string }>(`${this.apiUrl}auth/login`, credentials));
  //   return response.token;
  // }

  async getType(token: string): Promise<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return firstValueFrom(this.http.get<any>(`${this.apiUrl}getRole`, { headers }));
  }

  async getIdClient(token: string): Promise<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return firstValueFrom(this.http.get<any>(`${this.apiUrl}getUserId`, { headers }));
  }

  async check(email: string, password: string): Promise<any> {
    const user = JSON.stringify({ email: email, password: password });
    const headers= new HttpHeaders({ 'Content-Type': 'application/json' });
    return firstValueFrom(this.http.post<any>(`${this.apiUrl}testLogin`, user, { headers }));
  }

  async createUsers(name: string, email: string, numero: string, password: string, role: string){
    const user = {
      name: name,
      email: email,
      telephone: numero,
      password: password,
      role: role
    }
    console.log(user, "userrr");
    
    return firstValueFrom(this.http.post<any>(`${this.apiUrl}register`, user))
  }

  async getCountAllRdv(): Promise<any> {
    return firstValueFrom(this.http.get<any>(`${this.apiUrl}rdv/countAllRdv`));
  }

  async getCountRdvPending(): Promise<any> {
    return firstValueFrom(this.http.get<any>(`${this.apiUrl}rdv/countRdvPending`));
  }

  async getCountRdvLoading(): Promise<any> {
    return firstValueFrom(this.http.get<any>(`${this.apiUrl}rdv/countRdvLoading`));
  }

  async getCountRdvAnnule(): Promise<any> {
    return firstValueFrom(this.http.get<any>(`${this.apiUrl}rdv/countRdvAnnule`));
  }

  async getCountRdvDone(): Promise<any> {
    return firstValueFrom(this.http.get<any>(`${this.apiUrl}rdv/countRdvDone`));
  }

  async getStat(): Promise<any> {
    return firstValueFrom(this.http.get<any>(`${this.apiUrl}rdv/stat`));
  }

}
