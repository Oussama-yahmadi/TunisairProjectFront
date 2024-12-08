import { Component, OnInit } from '@angular/core';
import { Reclamation } from '../Models/Reclamation';
import { ReclamtionServiceService } from '../reclamtion-service.service';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-all-reclamtions',
  templateUrl: './all-reclamtions.component.html',
  styleUrls: ['./all-reclamtions.component.css']
})
export class AllReclamtionsComponent implements OnInit {
  showModal: boolean = false; // contrôle la visibilité du modal
  selectedReclamation: any = null;
  responseMessage: string = '';
  constructor(private reclamationService: ReclamtionServiceService, private authService: AuthServiceService ) { }
  ngOnInit(): void {
    this.reclamationService.getAllReclamations()
      .subscribe(
        reclamations => {
          console.log("yeeesss");
          
          this.users = reclamations;
          console.log('zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz ******Réclamations:', reclamations);
        },
        error => {
          console.error('Erreur lors de la récupération des réclamations:', error);
        }
      );
  }
 
  users: Reclamation[] = [];

   // Fonction pour ouvrir le modal avec la réclamation sélectionnée
   openModal(reclamation: any): void {
    this.selectedReclamation = reclamation;
    this.showModal = true;
  }

  // Fonction pour fermer le modal
  closeModal(): void {
    this.showModal = false;
    this.selectedReclamation = null;
    this.responseMessage = '';
  }

  // Fonction pour soumettre la réponse
  submitResponse(): void {
    if (this.selectedReclamation && this.responseMessage.trim()) {
      // Logique d'envoi de la réponse via un service ou une API
      console.log(`Réponse pour la réclamation ${this.selectedReclamation.id}: ${this.responseMessage}`);
      
      // Après soumission, on ferme le modal
      this.closeModal();
    } else {
      alert('Veuillez entrer une réponse.');
    }
  }



}
