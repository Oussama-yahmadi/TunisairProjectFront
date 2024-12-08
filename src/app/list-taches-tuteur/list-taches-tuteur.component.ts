import { Component } from '@angular/core';
import { TacheServiceService } from '../tache-service.service';
import { Tache } from '../Models/Tache';
import { User } from '../Models/user';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-list-taches-tuteur',
  templateUrl: './list-taches-tuteur.component.html',
  styleUrls: ['./list-taches-tuteur.component.css']
})
export class ListTachesTuteurComponent {
  tuteurId: number=3;
  userConnected: User | null = null;
  tasks: Tache[] = [];
  constructor(private taskService: TacheServiceService,private authService: AuthServiceService){}
  ngOnInit(): void {
  
    this.authService.getUserDetails().subscribe(
      (user: User | null) => {
        if (user) {
          this.userConnected = user;
          console.log("Utilisateur connecté:", this.userConnected);

          this.taskService.Tachestuteur(this.userConnected.id).subscribe(
            (data: Tache[]) => {
              this.tasks = data;
              console.log("Tâches récupérées:", this.tasks);
            },
            error => {
              console.error('Erreur lors de la récupération des tâches:', error);
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
      }
  


