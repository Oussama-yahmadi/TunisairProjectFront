import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuestionDTO } from './Models/Question';

@Injectable({
  providedIn: 'root'
})
export class QuestionServiceService {

  private apiUrl = 'http://localhost:8089/PFE/question/questions'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) { }

  getQuestions(): Observable<QuestionDTO> {
    return this.http.get<any>(this.apiUrl);
  }

  
}
