import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reunion } from './Models/Reunion';
import { Observable } from 'rxjs';
import { User } from './Models/user';

@Injectable({
  providedIn: 'root'
})
export class ReunionServiceService {

  constructor(private http :HttpClient) { }

  // Méthode pour définir ponctuel à true pour une réunion spécifique
  setPonctuelTrue(id: number): void {
    this.http.post<any>(`http://localhost:8089/PFE/Reunion/${id}/set-ponctuel-true`, {}).subscribe(response => {
      console.log('Ponctuel défini à true pour la réunion:', response);
    }, error => {
      console.error('Une erreur s\'est produite lors de la définition de ponctuel à true:', error);
    });
  }

  // Méthode pour définir presence à true pour une réunion spécifique
  setPresenceTrue(id: number): void {
    this.http.post<any>(`http://localhost:8089/PFE/Reunion/${id}/set-presence-true`, {}).subscribe(response => {
      console.log('Presence définie à true pour la réunion:', response);
    }, error => {
      console.error('Une erreur s\'est produite lors de la définition de presence à true:', error);
    });
  }

  // Méthode pour définir estAcceptee à true pour une réunion spécifique
  setEstAccepteeTrue(id: number): Observable<Reunion> {
    return this.http.post<Reunion>(`http://localhost:8089/PFE/Reunion/${id}/set-est-acceptee-true`, {});
  }

  setEstRefuseTrue(id: number): Observable<Reunion> {
    return this.http.post<Reunion>(`http://localhost:8089/PFE/Reunion/${id}/set-est-refuse-true`, {});
  }

  
  ajouterReunion(reunion: Reunion, idTuteur: number): Observable<Reunion> {
    return this.http.post<Reunion>(`http://localhost:8089/PFE/Reunion/ajouterR/${idTuteur}`, reunion);
  }

  

  proposerReunion(reunion: Reunion, idStagiaire: number): Observable<Reunion> {
    return this.http.post<Reunion>(`http://localhost:8089/PFE/Reunion/proposerR/${idStagiaire}`, reunion);
  }

  getAllReunions(): void {
    this.http.get<Reunion>('http://localhost:8089/PFE/Reunion/all').subscribe(response => {
      console.log('Liste de toutes les réunions:', response);
    }, error => {
      console.error('Une erreur s\'est produite lors de la récupération de toutes les réunions:', error);
    });
  }

  getAllrdvplanifies(): Observable<Reunion[]> {
    return this.http.get<Reunion[]>('http://localhost:8089/PFE/Reunion/all');
  }

  calculerPonctualite(stagiaireId: number): void {
    this.http.get<any>(`http://localhost:8089/PFE/Reunion/calculerPonctualite/${stagiaireId}`).subscribe(response => {
      console.log('Ponctualité calculée avec succès:', response);
    }, error => {
      console.error('Une erreur s\'est produite lors du calcul de la ponctualité:', error);
    });
  }

   getReunionsByTuteurId(idTuteur: number): Observable<Reunion[]> {
    return this.http.get<Reunion[]>(`http://localhost:8089/PFE/Reunion/tuteurs/${idTuteur}/reunions`);
  }

  getAcceptedReunionsByTuteur(tuteurId: number): Observable<Reunion[]> {
    return this.http.get<Reunion[]>(`http://localhost:8089/PFE/Reunion/accepted/tuteur/${tuteurId}`);
  }

  getPropsedReunionsByTuteur(tuteurId: number): Observable<Reunion[]> {
    return this.http.get<Reunion[]>(`http://localhost:8089/PFE/Reunion/proposed/tuteur/${tuteurId}`);
  }

  getReunionsByStagiaire(stagiaireId: number): Observable<Reunion[]> {
    return this.http.get<Reunion[]>(`http://localhost:8089/PFE/Reunion/reunionsStagiaires/${stagiaireId}`);
  }

  getStagiairessByTuteurId(idTuteur: number): Observable<User[]> {
    return this.http.get<User[]>(`http://localhost:8089/PFE/User/${idTuteur}/stagiaires`);
  }


  setPresenceTruee(id: number): Observable<Reunion> {
    return this.http.post<Reunion>(`http://localhost:8089/PFE/Reunion/${id}/set-presence-true`, {});
  }

  setPonctuelTruee(id: number): Observable<Reunion> {
    return this.http.post<Reunion>(`http://localhost:8089/PFE/Reunion/${id}/set-ponctuel-true`, {});
  }


  
}
