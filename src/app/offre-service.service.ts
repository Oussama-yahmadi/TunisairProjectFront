import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StageOffer } from './Models/StageOffer';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OffreServiceService {

  constructor(private http: HttpClient) { }

  addStagiaire(offer: StageOffer): Observable<StageOffer> {
    return this.http.post<StageOffer>(`http://localhost:8089/PFE/offre/add`, offer)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }

  getAllOffers(): Observable<StageOffer[]> {
    return this.http.get<StageOffer[]>(`http://localhost:8089/PFE/offre/all`);
  }

}
