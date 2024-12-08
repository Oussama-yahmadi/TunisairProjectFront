import { Component } from '@angular/core';
import { User } from '../Models/user';
import { AttestaionService } from '../attestaion.service';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-attestation',
  templateUrl: './attestation.component.html',
  styleUrls: ['./attestation.component.css']
})
export class AttestationComponent {
  selectedFile: File | null = null;
  githubLink: string = '';
  canPrint: boolean = false;
  userConnected: User | null = null;
  isValidAttestation: boolean = false; 
  constructor(private authService: AuthServiceService, private attestationService: AttestaionService) {}

  ngOnInit(): void {
    // Fetching the connected user details
    this.authService.getUserDetails().subscribe(
      (user: User | null) => {
        if (user) {
          this.userConnected = user;
          console.log("Utilisateur connecté:", this.userConnected);

          // Check if the user's attestation is valid
          this.checkAttestationValidity(user.id);
        } else {
          console.error('Utilisateur non trouvé');
        }
      },
      error => {
        console.error('Erreur lors de la récupération des détails de l\'utilisateur:', error);
      }
    );
  }

  checkAttestationValidity(stagiaireId: number) {
    this.attestationService.hasValidAttestation(stagiaireId).subscribe(
      (isValid: boolean) => {
        this.isValidAttestation = isValid;
        this.canPrint = isValid;  // Enable print button if attestation is valid
        console.log("Attestation valid:", this.isValidAttestation);
      },
      error => {
        console.error('Erreur lors de la vérification de l\'attestation:', error);
      }
    );
  }


  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.selectedFile = file;
      this.validateInput();
    } else {
      alert('Veuillez déposer un fichier PDF valide.');
    }
  }

  validateInput() {
    // Validation: file must be selected and GitHub link must be valid
    this.canPrint = this.selectedFile !== null && this.githubLink.trim().startsWith('https://github.com/');
  }

  submitData() {
    if (this.userConnected && this.selectedFile) {
      // Call the attestation service to upload data
      this.attestationService.uploadAttestation(
        this.userConnected.id,        // Pass stagiaireId
        this.githubLink,              // Pass the GitHub link
        this.selectedFile             // Pass the PDF file
      ).subscribe(
        response => {
          console.log('Attestation submitted successfully:', response);
        },
        error => {
          console.error('Error submitting attestation:', error);
        }
      );
      window.location.reload();
     
    } else {
      console.error('User is not connected or no file selected');
    }
  }

  printAccord() {
    if (this.canPrint) {
      const printContent = document.getElementById('printArea');
      const WindowPrt = window.open('', '', 'width=800,height=600');
      WindowPrt?.document.write(printContent?.innerHTML || '');
      WindowPrt?.document.close();
      WindowPrt?.print();
    }
  }

  disableInputs() {
    const fileInput = document.getElementById('rapport') as HTMLInputElement;
    const githubInput = document.getElementById('github') as HTMLInputElement;

    if (fileInput && githubInput) {
      fileInput.disabled = true;
      githubInput.disabled = true;
    }
  }
}
