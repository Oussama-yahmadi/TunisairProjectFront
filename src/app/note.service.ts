import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Note } from './Models/Note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private baseUrl = 'http://localhost:8089/PFE/note'; // Update the URL if different

  constructor(private http: HttpClient) { }

  // Get all notes for a specific reunion
  getNotesByReunion(reunionId: number): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.baseUrl}/reunion/${reunionId}`);
  }

  // Add a new note to a reunion
  addNoteToReunion(reunionId: number, userId: number, content: string): Observable<Note> {
    const body = { content };
    return this.http.post<Note>(`${this.baseUrl}/reunion/${reunionId}/user/${userId}`, body, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }
}
