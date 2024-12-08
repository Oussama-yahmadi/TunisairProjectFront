import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './Models/user';
import { Observable, catchError, throwError } from 'rxjs';
import { StagiaireRequest } from './Models/StagiaireRequest';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private apiUrl = 'http://localhost:8089/PFE/User';

  constructor(private http: HttpClient) { }
  addTest(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/testeur/add`, user)
      .pipe(
        catchError(this.handleError)
      );
  }

  addStagiaire(user: User): Observable<User> {
    return this.http.post<User>(`http://localhost:8089/PFE/User/stagiaire/add`, user)
      .pipe(
        catchError(this.handleError)
      );
  }

  addStagiaireRequest(stagiaireRequest: StagiaireRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/stagiaire/add`, stagiaireRequest);
  }

  addProduct(productData: User, imageName: string): Observable<any> {
    const url = `http://localhost:8089/PFE/User/Tuteur/add/${imageName}`;
    return this.http.post(url, productData);
}


  getAlltesters(): Observable<User[]> {
    return this.http.get<User[]>(`http://localhost:8089/PFE/User/testeurs/TESTEUR`);
  }

  getAlltuteurs(): Observable<User[]> {
    return this.http.get<User[]>(`http://localhost:8089/PFE/User/testeurs/TUTEUR`);
  }
  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }

  getAllCONDIDATS(): Observable<User[]> {
    return this.http.get<User[]>(`http://localhost:8089/PFE/User/testeurs/CONDIDAT`);
  }


 

  getTuteurOfStagiaire(stagiaireId: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/TuteurByStagiaire/${stagiaireId}`);
  }

  getStagiairesByTuteur(tuteurId: number): Observable<User[]> {
    return this.http.get<User[]>(`http://localhost:8089/PFE/User/${tuteurId}/stagiaires`);
  }
}
