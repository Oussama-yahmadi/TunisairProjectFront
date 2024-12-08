import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatbotRequest } from './Models/ChatbotRequest';

@Injectable({
  providedIn: 'root'
})
export class ChatbotServiceService {
  private apiUrl = 'http://localhost:8089/PFE/api/chatbot/query';  // Assurez-vous que l'URL correspond à votre backend

  

  constructor(private http: HttpClient) { }

  sendMessage(request: ChatbotRequest): Observable<string> {
    return this.http.post<string>(this.apiUrl, request, { responseType: 'text' as 'json' });
  }
}
