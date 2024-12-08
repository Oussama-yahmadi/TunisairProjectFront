import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map } from 'rxjs';
import { Tache } from './Models/Tache';
import { MarkTaskCompletionRequest } from './Models/MarkTaskCompletionRequest';
import { Stage } from './Models/Stage';

@Injectable({
  providedIn: 'root'
})
export class TacheServiceService {

  private baseUrl = 'http://localhost:8089/PFE/Tache';

  constructor(private http: HttpClient) { }

  // Méthode pour récupérer les taches d'un stagiaire spécifique
  getTachesStagiaire(stagiaireId: number): Observable<Tache[]> {
    const url = `${this.baseUrl}/stagiaires/${stagiaireId}/taches`;
    console.log(url);
    
    return this.http.get<Tache[]>(url);
  }

  TachesByStagiaire(stagiaireId: number): Observable<Tache[]> {
    const url = `${this.baseUrl}/stagiaires/${stagiaireId}/taches`;
    return this.http.get<Tache[]>(url);
  }

  Tachestuteur(tuteirId: number): Observable<Tache[]> {
    const url = `${this.baseUrl}/tuteur/${tuteirId}/taches`;
    return this.http.get<Tache[]>(url);
  }

  getCountByScoreAndStagiaireId(stagiaireId: number, score: string): Observable<number> {
     const url = `${this.baseUrl}/count?stagiaireId=${stagiaireId}&score=${score}`;
     console.log(url);
     
    return this.http.get<number>(url);
    
    
    
    
    

  }

  ajouterTache(tache: Tache, idTuteur: number): Observable<Tache> {
    return this.http.post<Tache>(`${this.baseUrl}/ajouterTache/${idTuteur}`, tache);
  }

  getAllTachess(): void {
    this.http.get<Tache>('http://localhost:8089/PFE/Tache/all').subscribe(response => {
      console.log('Liste de toutes les réunions:', response);
    }, error => {
      console.error('Une erreur s\'est produite lors de la récupération de toutes les taches:', error);
    });
  }

  // getCountTachesByScoreAndStagiaireId(stagiaireId: number, score: string): Observable<number> {
  //   const url = `${this.baseUrl}/count?stagiaireId=${stagiaireId}&score=${score}`;
  //   return this.http.get<number>(url);
  // }

  getCountTachesByScoreAndStagiaireId(stagiaireId: number, score: string): Observable<number> {
    console.log(`Appel API pour getCountTachesByScoreAndStagiaireId avec stagiaireId: ${stagiaireId}, score: ${score}`);
    return this.http.get<number>(`${this.baseUrl}/count?stagiaireId=${stagiaireId}&score=${score}`);
  }


  getAllTaches(): Observable<Tache[]> {
    return this.http.get<Tache[]>('http://localhost:8089/PFE/Tache/all');
  }

  markTaskAsCompleted(request: MarkTaskCompletionRequest): Observable<void> {
    return this.http.post<void>(`http://localhost:8089/PFE/Tache/taskscompleted`, request);
  }


  // fetchEvents(): Observable<any[]> {
  //   // Combine les appels HTTP pour récupérer à la fois les réunions et les tâches
  //   return forkJoin([
  //     this.getAllReunions(),
  //     this.getAllTaches()
  //   ]).pipe(
  //     map(([reunions, taches]) => {
  //       // Combine les listes de réunions et de tâches en une seule liste d'événements
  //       const events = [...reunions, ...taches];
  //       return events;
  //     })
  //   );
  // }
 

  
  calculerTempsRestant(stage: Stage): Observable<string> {
    return this.http.post<string>(`http://localhost:8089/PFE/stage/calculer`, stage);
  }




  }

  // getTachesStagiaire(): Observable<Tache[]> {
  //   return this.http.get<Tache[]>(`http://localhost:8089/PFE/Tache/stagiaires/4/taches`);
  // }

