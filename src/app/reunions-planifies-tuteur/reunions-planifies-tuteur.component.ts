import { Component, OnInit } from '@angular/core';
import { Reunion } from '../Models/Reunion';
import { ReunionServiceService } from '../reunion-service.service';

@Component({
  selector: 'app-reunions-planifies-tuteur',
  templateUrl: './reunions-planifies-tuteur.component.html',
  styleUrls: ['./reunions-planifies-tuteur.component.css']
})
export class ReunionsPlanifiesTuteurComponent implements OnInit {

  reunionsPlanifiees: Reunion[] = [];
  idTuteur : number = 3 ;
  constructor(private reunionService: ReunionServiceService) { }
  ngOnInit(): void {
    this.reunionService.getReunionsByTuteurId(this.idTuteur)
    .subscribe(reunions => {
      this.reunionsPlanifiees = reunions;
      console.log('Réunions par tuteur:',  this.reunionsPlanifiees);
    },
    error => {
      console.error('Une erreur s\'est produite lors de la récupération des réunions par tuteur:', error);
    });

  }

  setPresence(id: number): void {
    this.reunionService.setPresenceTruee(id).subscribe(
      updatedReunion => {
        console.log('Présence définie pour la réunion:', updatedReunion);
        this.updateReunionInList(updatedReunion);
      },
      error => {
        console.error('Erreur lors de la définition de la présence:', error);
      }
    );
  }

  setPonctualite(id: number): void {
    this.reunionService.setPonctuelTruee(id).subscribe(
      updatedReunion => {
        console.log('Ponctualité définie pour la réunion:', updatedReunion);
        this.updateReunionInList(updatedReunion);
      },
      error => {
        console.error('Erreur lors de la définition de la ponctualité:', error);
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
