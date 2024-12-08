import { Component, OnInit } from '@angular/core';
import { ReclamtionServiceService } from '../reclamtion-service.service';
import { AuthServiceService } from '../auth-service.service';
import { Reclamation } from '../Models/Reclamation';
import { User } from '../Models/user';

@Component({
  selector: 'app-tuteur-reclamations',
  templateUrl: './tuteur-reclamations.component.html',
  styleUrls: ['./tuteur-reclamations.component.css']
})
export class TuteurReclamationsComponent implements OnInit {
  userConnected: User | null = null;


  constructor(private reclamationService: ReclamtionServiceService, private authService: AuthServiceService ) { }
  ngOnInit(): void {
    this.authService.getUserDetails().subscribe(
      userDetails => {
        this.userConnected = userDetails;
      },
      error => {
        console.error('Une erreur s\'est produite lors de la récupération des détails de l\'utilisateur:', error);
      }
    );

    if(this.userConnected){
    this.reclamationService.getReclamationsByTuteurId(this.userConnected.id)
      .subscribe(
        reclamations => {
          console.log("yeeesss");
          
          this.users = reclamations;
          console.log('zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz ******Réclamations des stagiaires de ce tuteur : ', reclamations);
          console.log("hey hey heyy heyyh"+this.users);
          
        },
        error => {
          console.error('Erreur lors de la récupération des réclamations:', error);
        }
      );}
      else{
        console.log("user not connected ");
        
      }
  }
 
  users: Reclamation[] = [];
}
