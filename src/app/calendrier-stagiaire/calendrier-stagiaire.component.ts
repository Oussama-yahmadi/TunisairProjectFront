import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core'; 
import dayGridPlugin from '@fullcalendar/daygrid';
import { Reunion } from '../Models/Reunion';
import { Tache } from '../Models/Tache';
import { User } from '../Models/user';
import { ReunionServiceService } from '../reunion-service.service';
import { TacheServiceService } from '../tache-service.service';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-calendrier-stagiaire',
  templateUrl: './calendrier-stagiaire.component.html',
  styleUrls: ['./calendrier-stagiaire.component.css']
})
export class CalendrierStagiaireComponent {

  listReunionsAcc: Reunion[] = [];
  listTaches: Tache[] = [];
  searchTerm: string = '';
  filteredReunions: Reunion[] = [];
  filteredTaches: Tache[] = [];
  userConnected: User | null = null;

  constructor(
    private reunionService: ReunionServiceService,
    private tacheService: TacheServiceService,
    private authService: AuthServiceService
  ) { }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    events: []
  };

  handleDateClick(arg: { dateStr: string; }) {
    alert('date click! ' + arg.dateStr)
  }

  filterEvents(): void {
    if (!this.searchTerm.trim()) {
      this.filteredReunions = this.listReunionsAcc;
      this.filteredTaches = this.listTaches;
    } else {
      this.filteredReunions = this.listReunionsAcc.filter(reunion =>
        reunion.tuteur.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        reunion.stagiaire.nom.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      this.filteredTaches = this.listTaches.filter(tache =>
        tache.tuteur.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        tache.stagiaire.nom.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    this.updateCalendarEvents();
  }

  loadReunionsAcc(): void {
    if (this.userConnected) {
      this.reunionService.getReunionsByStagiaire(this.userConnected.id).subscribe(
        (res) => {
          console.log(res);
          this.listReunionsAcc = res;
          this.filterEvents();
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  loadTaches(): void {
    if (this.userConnected) {
      this.tacheService.TachesByStagiaire(this.userConnected.id).subscribe(
        (res) => {
          console.log(res);
          this.listTaches = res;
          this.filterEvents();
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  updateCalendarEvents(): void {
    const events: any[] = [];
  
    this.filteredReunions.forEach((reunion) => {
      events.push({
        title: reunion.titre + "\n Stagiaire : \n" + reunion.stagiaire.nom,
        date: reunion.date,
        color: 'red'
      });
    });
  
    this.filteredTaches.forEach((tache: Tache) => {
      events.push({
        title: tache.titre + "\n Stagiaire : \n" + tache.stagiaire.nom,
        date: tache.date,
        color: 'green'
      });
    });
  
    this.calendarOptions.events = events;
  }

  ngOnInit(): void {
    this.authService.getUserDetails().subscribe(
      userDetails => {
        this.userConnected = userDetails;
        this.loadReunionsAcc();
        this.loadTaches();
      },
      error => {
        console.error('Une erreur s\'est produite lors de la récupération des détails de l\'utilisateur:', error);
      }
    );
  }
}


