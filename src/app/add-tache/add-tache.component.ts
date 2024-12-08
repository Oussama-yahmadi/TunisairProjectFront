import { Component, OnInit } from '@angular/core';
import { User } from '../Models/user';
import { TacheServiceService } from '../tache-service.service';
import { AuthServiceService } from '../auth-service.service';
import { Tache } from '../Models/Tache';
import { ReunionServiceService } from '../reunion-service.service';

@Component({
  selector: 'app-add-tache',
  templateUrl: './add-tache.component.html',
  styleUrls: ['./add-tache.component.css']
})
export class AddTacheComponent implements OnInit{
  tache: Tache = new Tache ();
  listusers: User[] = [];
  constructor(  
  
    private tacheService: TacheServiceService,
    private authService: AuthServiceService,
   private reunionService: ReunionServiceService
  ) {
    
  }
  ngOnInit(): void {
    this.authService.getUserDetails().subscribe(
      (user: User | null) => {
        if (user) {
          this.userConnected = user;
          console.log("Utilisateur connecté:", this.userConnected);
          
          this.reunionService.getStagiairessByTuteurId(this.userConnected.id).subscribe(
            data => {
              this.listusers = data;
              console.log("==================================================");
              
              console.log("Stagiaires fetched successfully:", this.listusers);
            },
            error => {
              console.error('Error fetching stagiaires:', error);
            }
          );
        } else {
          console.error('Utilisateur non trouvé');
        }
      },
      error => {
        console.error('Erreur lors de la récupération des détails de l\'utilisateur:', error);
      }
    );
    
  }

  userConnected: User | null = null;


 onSubmit(): void {
    // Envoyer les données du stagiaire à votre backend pour l'ajout
  if(this.userConnected){
    this.tacheService.ajouterTache(this.tache,this.userConnected.id).subscribe(
      (response: any) => {
        console.log('offre ajouté avec succès:', response);
        window.location.reload();
        // Rediriger l'utilisateur vers une autre page après l'ajout réussi
       // this.router.navigate(['/listeStagiaires']);
      },
      (error: any) => {
        console.error('Erreur lors de l\'ajout du offre:', error);
        window.alert("Tache ajoutée avec succès  ")
        console.log("stagiaire erreur" + JSON.stringify(this.tache));

        // Gérer les erreurs ici, par exemple afficher un message d'erreur à l'utilisateur
      }
    );
   
  }else {
    console.log("user not connected ");
    
  }
}
}