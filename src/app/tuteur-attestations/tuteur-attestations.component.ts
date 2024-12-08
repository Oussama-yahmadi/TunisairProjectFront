import { Component } from '@angular/core';
import { Attestation } from '../Models/Attestation';
import { AttestaionService } from '../attestaion.service';

@Component({
  selector: 'app-tuteur-attestations',
  templateUrl: './tuteur-attestations.component.html',
  styleUrls: ['./tuteur-attestations.component.css']
})
export class TuteurAttestationsComponent {
  attestations: Attestation[] = [];

  constructor(private attestationService: AttestaionService) {}

  ngOnInit(): void {
    this.fetchAttestations();
  }

  fetchAttestations(): void {
    const tutorId = 3; // Remplacez ceci par la récupération de l'ID du tuteur connecté
    this.attestationService.getAttestationsByTutorId(tutorId).subscribe(
      (data: Attestation[]) => {
        this.attestations = data;
      },
      error => {
        console.error('Erreur lors de la récupération des attestations', error);
      }
    );
  }

  validateAttestation(attestationId: number): void {
    this.attestationService.validateAttestation(attestationId).subscribe(
      response => {
        console.log('Attestation validée avec succès', response);
        this.fetchAttestations(); // Rechargez les attestations après la validation
      },
      error => {
        console.error('Erreur lors de la validation de l\'attestation', error);
      }
    );
    window.location.reload();
  }

  // downloadPdf(attestationId: number): void {
  //   this.attestationService.downloadPdf(attestationId).subscribe(
  //     (blob: Blob) => {
  //       const url = window.URL.createObjectURL(blob);
  //       const a = document.createElement('a');
  //       a.href = url;
  //       a.download = 'attestation.pdf';
  //       document.body.appendChild(a);
  //       a.click();
  //       window.URL.revokeObjectURL(url);
  //     },
  //     error => {
  //       console.error('Erreur lors du téléchargement du PDF', error);
  //     }
  //   );
  // }

}
