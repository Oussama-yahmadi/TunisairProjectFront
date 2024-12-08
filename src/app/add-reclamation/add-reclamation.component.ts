import { Component, OnInit } from '@angular/core';
import { ReclamtionServiceService } from '../reclamtion-service.service';
import { Reclamation } from '../Models/Reclamation';
import { AuthServiceService } from '../auth-service.service';
import { User } from '../Models/user';

@Component({
  selector: 'app-add-reclamation',
  templateUrl: './add-reclamation.component.html',
  styleUrls: ['./add-reclamation.component.css']
})
export class AddReclamationComponent implements OnInit {
  reclamtion: Reclamation = new Reclamation();
  idStagiaire : number = 4 ;

  userConnected: User | null = null;

  constructor(
   
    private reclamationService: ReclamtionServiceService , private authService: AuthServiceService // Injectez votre service UserService
  ) { }
  ngOnInit(): void {
    this.authService.getUserDetails().subscribe(
      userDetails => {
        this.userConnected = userDetails;
      },
      error => {
        console.error('Une erreur s\'est produite lors de la récupération des détails de l\'utilisateur:', error);
      }
    );
  }




  onSubmit(): void {
    if (this.userConnected) {
      this.reclamationService.createReclamation(this.reclamtion, this.userConnected.id).subscribe(
        response => {
          console.log('Réclamation ajoutée avec succès:', response);
          // Rediriger l'utilisateur ou afficher un message après l'ajout réussi
          window.alert('Merci de reclamer');
        },
        error => {
          console.error('Erreur lors de l\'ajout de la réclamation:', error);
          // Gérer les erreurs ici, par exemple afficher un message d'erreur à l'utilisateur
        }
      );
      window.location.reload();
    } else {
      console.error('Utilisateur non connecté');
      // Gérer le cas où l'utilisateur n'est pas connecté
    }
  }
}
