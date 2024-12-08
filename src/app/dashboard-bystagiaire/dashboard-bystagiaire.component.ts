import { Component } from '@angular/core';
import { Chart, ChartType } from 'chart.js';
import { TacheServiceService } from '../tache-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard-bystagiaire',
  templateUrl: './dashboard-bystagiaire.component.html',
  styleUrls: ['./dashboard-bystagiaire.component.css']
})
export class DashboardBystagiaireComponent {
  searchTerm: string = '';
  stagiaires: any[] = []; // Liste des stagiaires
  filteredStagiaires: any[] = []; // Liste filtrée
  stagiaireSelected: any | null = null;

  countTachesBon: number = 0;
  countTachesMoyen: number = 0;
  countTachesMauvais: number = 0;

  ponctualite!: number;
  serieux!: number;
  presence!: number;
  satisfactionValue: number = 0;

  pieChart: Chart | null = null;
  radarChart: Chart | null = null;

  constructor(private taskService: TacheServiceService, private http: HttpClient) {}

  ngOnInit() {
    this.loadStagiaires();
  }

  loadStagiaires(): void {
    // Charger la liste des stagiaires
    this.http.get<any[]>('http://localhost:8089/PFE/Stagiaires').subscribe(
      (stagiaires) => {
        this.stagiaires = stagiaires;
        this.filteredStagiaires = stagiaires;
      },
      (error) => console.error('Erreur lors du chargement des stagiaires', error)
    );
  }

  filterStagiaires(): void {
    this.filteredStagiaires = this.stagiaires.filter((stagiaire) =>
      (stagiaire.nom + ' ' + stagiaire.prenom)
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase())
    );
  }

  selectStagiaire(stagiaire: any): void {
    this.stagiaireSelected = stagiaire;
    this.filteredStagiaires = [];
    this.searchTerm = `${stagiaire.nom} ${stagiaire.prenom}`;
    this.loadDashboardData(stagiaire.id);
  }

  loadDashboardData(stagiaireId: number): void {
    this.loadSatisfactionValue(stagiaireId);
    this.loadTaskCounts(stagiaireId);
    this.loadPerformanceData(stagiaireId);
  }

  loadTaskCounts(stagiaireId: number): void {
    Promise.all([
      this.taskService.getCountTachesByScoreAndStagiaireId(stagiaireId, 'Bon').toPromise(),
      this.taskService.getCountTachesByScoreAndStagiaireId(stagiaireId, 'Moyen').toPromise(),
      this.taskService.getCountTachesByScoreAndStagiaireId(stagiaireId, 'Mauvais').toPromise(),
    ])
      .then(([bon, moyen, mauvais]) => {
        this.countTachesBon = bon || 0;
        this.countTachesMoyen = moyen || 0;
        this.countTachesMauvais = mauvais || 0;
        this.initPieChart();
      })
      .catch((error) => console.error('Erreur lors du chargement des tâches', error));
  }

  loadSatisfactionValue(stagiaireId: number): void {
    this.http
      .get<number>(`http://localhost:8089/PFE/Satisfaction/calculer/${stagiaireId}`)
      .subscribe(
        (value) => {
          this.satisfactionValue = Math.round(value);
          this.createCircularCounter();
        },
        (error) => console.error('Erreur lors de la récupération de la satisfaction', error)
      );
  }

  loadPerformanceData(stagiaireId: number): void {
    Promise.all([
      this.http.get<number>(`http://localhost:8089/PFE/Reunion/calculerPonctualite/${stagiaireId}`).toPromise(),
      this.http.get<number>(`http://localhost:8089/PFE/Satisfaction/estimerPerformance/${stagiaireId}`).toPromise(),
      this.http.get<number>(`http://localhost:8089/PFE/Reunion/calculerPresence/${stagiaireId}`).toPromise(),
    ])
      .then(([ponctualite, serieux, presence]) => {
        this.ponctualite = ponctualite || 0;
        this.serieux = serieux || 0;
        this.presence = presence || 0;
        this.initRadarChart();
      })
      .catch((error) => console.error('Erreur lors du chargement des données', error));
  }

  initPieChart(): void {
    const data = {
      labels: ['Bon', 'Moyen', 'Mauvais'],
      datasets: [
        {
          data: [this.countTachesBon, this.countTachesMoyen, this.countTachesMauvais],
          backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
          hoverBackgroundColor: ['#36A2EB', '#FFCE56', '#FF6384']
        }
      ]
    };

    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top' as const,  // Utilisez 'top' as const pour indiquer que c'est une valeur constante.
        }
      }
    };

    // Vérifiez si le graphique existe déjà et le détruisez pour le recréer
    if (this.pieChart) {
      this.pieChart.destroy();
    }
    
    this.pieChart = new Chart('pieChart', {
      type: 'pie' as ChartType,
      data: data,
      options: options
    });
  }

  initRadarChart(): void {
    const data = {
      labels: ['Ponctualité', 'Sérieux', 'Présence'],
      datasets: [
        {
          label: 'Performances',
          data: [this.ponctualite, this.serieux, this.presence],
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
        },
      ],
    };

    if (this.radarChart) this.radarChart.destroy();
    this.radarChart = new Chart('radarChart', { type: 'radar', data });
  }

  createCircularCounter(): void {
    const canvas = document.getElementById('counterCanvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 80;
    const value = this.satisfactionValue;
    const endAngle = (2 * Math.PI * value) / 100;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#eaeaea';
    ctx.lineWidth = 10;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, endAngle);
    ctx.strokeStyle = '#36A2EB';
    ctx.lineWidth = 10;
    ctx.stroke();

    ctx.font = '20px Arial';
    ctx.fillStyle = '#000';
    ctx.textAlign = 'center';
    ctx.fillText(`${value}%`, centerX, centerY);
  }

}
