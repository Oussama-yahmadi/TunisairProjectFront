import { Component } from '@angular/core';
import { OffreServiceService } from '../offre-service.service';

@Component({
  selector: 'app-add-offre',
  templateUrl: './add-offre.component.html',
  styleUrls: ['./add-offre.component.css']
})
export class AddOffreComponent {
  offre: any = {};
  constructor (private offerService : OffreServiceService){}


  onSubmit(): void {
    // Envoyer les données du stagiaire à votre backend pour l'ajout
    this.offerService.addStagiaire(this.offre).subscribe(
      (response: any) => {
        console.log('offre ajouté avec succès:', response);
        window.location.reload();
        // Rediriger l'utilisateur vers une autre page après l'ajout réussi
       // this.router.navigate(['/listeStagiaires']);
      },
      (error: any) => {
        console.error('Erreur lors de l\'ajout du offre:', error);
        window.alert("erreur lors de l ajout de loffre ")
        // Gérer les erreurs ici, par exemple afficher un message d'erreur à l'utilisateur
      }
    );
   
  }

}
