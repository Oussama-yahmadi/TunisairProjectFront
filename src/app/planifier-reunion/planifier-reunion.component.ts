import { Component, OnInit } from '@angular/core';
import { ReunionServiceService } from '../reunion-service.service';
import { User } from '../Models/user';
import { Reunion } from '../Models/Reunion';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-planifier-reunion',
  templateUrl: './planifier-reunion.component.html',
  styleUrls: ['./planifier-reunion.component.css']
})
export class PlanifierReunionComponent implements OnInit {
  reunion: Reunion = new Reunion();
  listusers: User[] = [];
  idTuteur: number = 3; // Replace with the actual tutor ID

  constructor(private reunionService: ReunionServiceService) {}

  ngOnInit(): void {
    this.reunionService.getStagiairessByTuteurId(this.idTuteur).subscribe(
      data => {
        this.listusers = data;
        console.log("Stagiaires fetched successfully:", this.listusers);
      },
      error => {
        console.error('Error fetching stagiaires:', error);
      }
    );
  }

  ajouterReunion(): void {
    this.reunionService.ajouterReunion(this.reunion, this.idTuteur).subscribe(
      response => {
        console.log('Reunion added successfully:', response);
window.alert('Reunion added successfully') ;
       
      },
      error => {
        console.error('Error adding reunion:', error);
        console.log("stagiaire erreur" + JSON.stringify(this.reunion));
      }
    );
     window.location.reload();
  }

  }

 





