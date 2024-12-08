import { Component, OnInit } from '@angular/core';
import { Reunion } from '../Models/Reunion';
import { User } from '../Models/user';
import { ReunionServiceService } from '../reunion-service.service';

@Component({
  selector: 'app-propsed-reunion',
  templateUrl: './propsed-reunion.component.html',
  styleUrls: ['./propsed-reunion.component.css']
})
export class PropsedReunionComponent implements OnInit {
  reunionsPlanifiees: Reunion[] = [];
  Stagiaire : User = new User() ;
  idTuteur : number = 3 ;
  constructor(private reunionService: ReunionServiceService) { }
  ngOnInit(): void {

    this.reunionService.getPropsedReunionsByTuteur(this.idTuteur)
    .subscribe(reunions => {
      this.reunionsPlanifiees = reunions;
      console.log('Réunions par tuteur:',  this.reunionsPlanifiees);
    },
    error => {
      console.error('Une erreur s\'est produite lors de la récupération des réunions par tuteur:', error);
    });


   
  }

  accepterReunion(id: number): void {
    this.reunionService.setEstAccepteeTrue(id).subscribe(
      updatedReunion => {
        console.log('Réunion acceptée:', updatedReunion);
        this.updateReunionInList(updatedReunion);
        window.location.reload();
      },
      error => {
        console.error('Erreur lors de l\'acceptation de la réunion:', error);
      }
    );
  }

  refuserReunion(id: number): void {
    this.reunionService.setEstRefuseTrue(id).subscribe(
      updatedReunion => {
        console.log('Réunion refusée:', updatedReunion);
        this.updateReunionInList(updatedReunion);
        window.location.reload();
      },
      error => {
        console.error('Erreur lors du refus de la réunion:', error);
      }
    );
  }


  private updateReunionInList(updatedReunion: Reunion): void {
    const index = this.reunionsPlanifiees.findIndex(r => r.idReunion === updatedReunion.idReunion);
    if (index !== -1) {
      this.reunionsPlanifiees[index] = updatedReunion;
    }
  }


}
