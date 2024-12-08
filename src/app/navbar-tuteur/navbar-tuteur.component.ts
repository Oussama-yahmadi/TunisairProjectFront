import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';
import { User } from '../Models/user';
import { AttestaionService } from '../attestaion.service';
import { Attestation } from '../Models/Attestation';

@Component({
  selector: 'app-navbar-tuteur',
  templateUrl: './navbar-tuteur.component.html',
  styleUrls: ['./navbar-tuteur.component.css']
})
export class NavbarTuteurComponent implements OnInit {
  userConnected: User | null = null;
  nonValidatedCount: number = 0;
  nonValidatedAttestations: Attestation[] = [];
  constructor(private authService: AuthServiceService, private attestationService: AttestaionService, private router: Router) {}
  ngOnInit(): void {
    this.authService.getUserDetails().subscribe(
      (userDetails: User | null) => {
        this.userConnected = userDetails;

        if (this.userConnected) {
          // Fetch non-validated attestation count
          this.attestationService.getNonValidatedAttestations(this.userConnected.id).subscribe(
            (attestations: Attestation[]) => {
              this.nonValidatedAttestations = attestations;
              this.nonValidatedCount = attestations.length; // Met à jour le nombre
            },
            (error) => {
              console.error('Error fetching non-validated attestations:', error);
            }
          );
        }
      },
      error => {
        console.error("Error fetching user details:", error);
      }
    );
  }
  logout(): void {
    this.authService.logout();
    console.log("deconnected");
    
  }

}
