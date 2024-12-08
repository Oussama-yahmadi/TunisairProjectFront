import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Attestation } from './Models/Attestation';

@Injectable({
  providedIn: 'root'
})
export class AttestaionService {

  private apiUrl = 'http://localhost:8089/attestation';  // URL de l'API backend

  constructor(private http: HttpClient) { }

  // Uploader une attestation
  uploadAttestation(stagiaireId: number, githubLink: string, reportPdf: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('githubLink', githubLink);
    formData.append('reportPdf', reportPdf);
  
    return this.http.post(`http://localhost:8089/PFE/attestation/upload/${stagiaireId}`, formData);
  }
  // Valider une attestation
  validateAttestation(attestationId: number): Observable<any> {
    return this.http.post(`http://localhost:8089/PFE/attestation/validate/${attestationId}`, {});
  }

  // Récupérer une attestation par ID
  getAttestation(attestationId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${attestationId}`);
  }

  getAttestationsByTutorId(tutorId: number): Observable<Attestation[]> {
    return this.http.get<Attestation[]>(`http://localhost:8089/PFE/attestation/tutor/${tutorId}/attestations`);
  }

  hasValidAttestation(stagiaireId: number): Observable<boolean> {
    return this.http.get<boolean>(`http://localhost:8089/PFE/attestation/isValid/${stagiaireId}`);
  }

  getNonValidatedAttestationCount(tuteurId: number): Observable<number> {
    return this.http.get<number>(`http://localhost:8089/PFE/attestation/countNonValide/${tuteurId}`);
  }

  getNonValidatedAttestations(tuteurId: number): Observable<Attestation[]> {
    return this.http.get<Attestation[]>(`http://localhost:8089/PFE/attestation/non-validated/${tuteurId}`);
  }
}
