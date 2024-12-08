import { Component, OnInit } from '@angular/core';
import { ReclamtionServiceService } from '../reclamtion-service.service';
import { Reclamation } from '../Models/Reclamation';
import { User } from '../Models/user';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-my-reclamations',
  templateUrl: './my-reclamations.component.html',
  styleUrls: ['./my-reclamations.component.css']
})
export class MyReclamationsComponent implements OnInit{
  idStagiaire : number = 4 ;
  users: Reclamation[] = [];
  userConnected: User | null = null;

  constructor(private reclamationService: ReclamtionServiceService, private authService: AuthServiceService ) { }
  ngOnInit(): void {
    this.authService.getUserDetails().subscribe(
      userDetails => {
        this.userConnected = userDetails;
        if (this.userConnected) {
          this.loadReclamations(this.userConnected.id);
        }
      },
      error => {
        console.error('Une erreur s\'est produite lors de la récupération des détails de l\'utilisateur:', error);
      }
    );
  }

  loadReclamations(idStagiaire: number): void {
    this.reclamationService.getReclamationsByStagiaireId(idStagiaire)
      .subscribe(
        reclamations => {
          this.users = reclamations;
          console.log('Réclamations:', this.users);
        },
        error => {
          console.error('Erreur lors de la récupération des réclamations:', error);
        }
      );
  }

}
