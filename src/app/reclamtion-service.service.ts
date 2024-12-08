import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reclamation } from './Models/Reclamation';

@Injectable({
  providedIn: 'root'
})
export class ReclamtionServiceService {
  private baseUrl = 'http://localhost:8089/PFE';

  constructor(private http: HttpClient) {}

  getAllReclamations(): Observable<Reclamation[]> {
    const url = `${this.baseUrl}/Reclamation/all`; // Assurez-vous que ce chemin est correct
    console.log('Fetching all reclamations from:', url); // Log the API URL
    return this.http.get<Reclamation[]>(url);
  }

  getReclamationById(id: number): Observable<Reclamation> {
    return this.http.get<Reclamation>(`http://localhost:8089/PFE/Reclamation/${id}`);
  }

  createReclamation(reclamation: Reclamation, idStagiaire: number): Observable<Reclamation> {
    return this.http.post<Reclamation>(`http://localhost:8089/PFE/Reclamation/addReclamation/${idStagiaire}`, reclamation);
  }

  updateReclamation(id: number, reclamation: Reclamation): Observable<Reclamation> {
    return this.http.put<Reclamation>(`http://localhost:8089/PFE/Reclamation/modifier/${id}`, reclamation);
  }

  deleteReclamation(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8089/PFE/Reclamation/delete/${id}`);
  }

  getReclamationsByStagiaireId(stagiaireId: number): Observable<Reclamation[]> {
    return this.http.get<Reclamation[]>(`http://localhost:8089/PFE/Reclamation/stagiaire/${stagiaireId}`);
  }

  getReclamationsByTuteurId(tuteurId: number): Observable<Reclamation[]> {
    return this.http.get<Reclamation[]>(`http://localhost:8089/PFE/Reclamation/tuteur/${tuteurId}`);
  }
}
