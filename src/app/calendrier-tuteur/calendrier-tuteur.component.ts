import { Component } from '@angular/core';
import { Reunion } from '../Models/Reunion';
import { Tache } from '../Models/Tache';
import { ReunionServiceService } from '../reunion-service.service';
import { TacheServiceService } from '../tache-service.service';
import { CalendarOptions } from '@fullcalendar/core'; 
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-calendrier-tuteur',
  templateUrl: './calendrier-tuteur.component.html',
  styleUrls: ['./calendrier-tuteur.component.css']
})
export class CalendrierTuteurComponent {

  listReunionsAcc : Reunion[] = [] ;
  listTaches: Tache[] = [];
  searchTerm: string = '' ;
  filteredReunions: Reunion[] = []; // liste filtrée des réunions
  filteredTaches: Tache[] = [];
  tuteurId: number=3;

  constructor(private reunionService:ReunionServiceService,private tacheService : TacheServiceService) {}
 

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
     // MUST ensure `this` context is maintained
    events: [
      // this.service.getAllrdvplanifies().subscribe(res=>{console.log(res);
      //   this.listReunionsAcc=res}),
        
    ]
  };
 

  handleDateClick(arg: { dateStr: string; }) {
    alert('date click! ' + arg.dateStr)
  }

  filterEvents(): void {

    if (!this.searchTerm.trim()) {
      // Si le searchTerm est vide, afficher toutes les réunions et tâches
      this.listReunionsAcc = this.listReunionsAcc;
      this.listTaches = this.listTaches;
    } else {
    // Filtrer les réunions en fonction du nom du tuteur ou du stagiaire
    this.listReunionsAcc = this.listReunionsAcc.filter(reunion =>
      reunion.tuteur.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      reunion.stagiaire.nom.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    // Filtrer les tâches en fonction du nom du tuteur ou du stagiaire
    this.listTaches = this.listTaches.filter(tache =>
      tache.tuteur.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      tache.stagiaire.nom.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    this.updateCalendarEvents(); // mettez à jour les événements affichés dans le calendrier
  }
  }

  loadReunionsAcc(): void {
    this.reunionService.getAcceptedReunionsByTuteur(this.tuteurId).subscribe(
      (res) => {
        console.log(res);
        this.listReunionsAcc = res;
        this.updateCalendarEvents();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  loadTaches(): void {
    this.tacheService.Tachestuteur(this.tuteurId).subscribe(
      (res) => {
        console.log(res);
        this.listTaches = res;
        this.updateCalendarEvents();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  updateCalendarEvents(): void {
    // const events: { title: string, tuteur?: string, stagiaire?: string, date: Date }[] = [];
    const events: any[] = [];

  
    // Ajouter les réunions
    this.listReunionsAcc.forEach((reunion) => {
      events.push({
        title: reunion.titre+"\n Stagiare :  \n"+ reunion.stagiaire.nom ,
       
        date: reunion.date,
        color : 'red'
      });
    });
  
    // Ajouter les tâches
    this.listTaches.forEach((tache: Tache) => {
      events.push({
        title: tache.titre +"\n"+" Stagiare :  "+"\n"+ tache.stagiaire.nom ,
       
        date: tache.date,

        color : 'green'
        
        
      });
    });
  
    this.calendarOptions.events = events;
  }






  ngOnInit(): void {
    this.loadReunionsAcc();
    this.loadTaches();
    console.log(this.listTaches);
    console.log(this.listReunionsAcc);
    
    
   
  }
}
