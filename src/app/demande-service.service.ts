import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Demande } from './Models/Demande';

@Injectable({
  providedIn: 'root'
})
export class DemandeServiceService {

  private apiUrl = 'http://localhost:8089/PFE/demande'; // URL de votre service REST

  constructor(private http: HttpClient) { }

  addDemande(demande: Demande): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/addDemande`, demande);
  }

  addProduct(productData: Demande, imageName: string): Observable<any> {
    const url = `http://localhost:8089/PFE/demande/addDemande/${imageName}`;
    return this.http.post(url, productData);
}


  getAllDemandes(): Observable<Demande[]> {
    return this.http.get<Demande[]>(`${this.apiUrl}/AllDemandes`);
  }
}
