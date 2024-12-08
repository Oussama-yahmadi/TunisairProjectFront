import { Component, OnInit } from '@angular/core';
import { TacheServiceService } from '../tache-service.service';
import { Tache } from '../Models/Tache';
import { Chart, ChartOptions, ChartType } from 'chart.js';
import { User } from '../Models/user';
import { AuthServiceService } from '../auth-service.service';
import { Stage } from '../Models/Stage';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chart-stagiaire-taches',
  templateUrl: './chart-stagiaire-taches.component.html',
  styleUrls: ['./chart-stagiaire-taches.component.css']
})
export class ChartStagiaireTachesComponent implements OnInit {
  userConnected: User | null = null;
  userConnectedId: number | null = null;
  stagiaireId: number = 4;
  tasks: Tache[] = [];
  countTachesBon: number = 0;
  countTachesMoyen: number = 0;
  countTachesMauvais: number = 0;
  tempsRestant: string = '';

  ponctualite!: number ;
  serieux!: number;
  presence!: number ;

   satisfactionValue: number = 0; 
   perfValue: number = 0; 

   pieChart: Chart | null = null;
  public doughnutChartData: number[] = [0, 0, 0]
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };


  totalTasks: number = 0;
  plannedMeetings: number = 0;
  uncompletedTasks: number = 0;
  acceptedMeetings: number = 0;
  declinedMeetings: number = 0;
  pourcentageCompleted : number =0 ;

  constructor(
    private taskService: TacheServiceService,
    private authService: AuthServiceService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.authService.getUserDetails().subscribe(
      (user: User | null) => {
        if (user) {
          this.userConnected = user;
          this.userConnectedId = user.id;
          this.loadSatisfactionValue(user.id);
          this.loadPerfermance(user.id) ; 
          this.loadDashboardSummary(user.id);
          console.log("stage de user est $$$$$$$$$$$$$$$$*************"+this.userConnectedId);
          
          this.getTempsRestant(this.userConnectedId);
          this.loadTaskCounts();
          this.loadPonctualite();
          console.log("ponc"+this.ponctualite);
          
          
          
          this.loadSerieux();
          console.log("ser"+this.serieux);
          this.loadPresence();
          if (user.stage) {
            
            console.log("user stage"+user.stage);
            console.log("waktt"+this.tempsRestant);
            
            
          } else {
            console.error('Stage non trouvé pour l\'utilisateur connecté');
          }
        } else {
          console.error('Utilisateur non trouvé');
        }
      },
      error => {
        console.error('Une erreur s\'est produite lors de la récupération des détails de l\'utilisateur:', error);
      }
    );

    this.createRadarChart();
    this.loadDataAndCreateChart();
    this.createCircularCounter();

    
 
   

  }
  
  

  // loadTaskCounts(): void {
  //   if (this.userConnectedId) {
  //     Promise.all([
  //       this.loadCountTaches('Bon'),
  //       this.loadCountTaches('Moyen'),
  //       this.loadCountTaches('Mauvais')
  //     ]).then(([countBon, countMoyen, countMauvais]) => {
  //       this.countTachesBon = countBon;
  //       this.countTachesMoyen = countMoyen;
  //       this.countTachesMauvais = countMauvais;
  //       console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb"+this.countTachesBon);
  //       console.log("mvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv"+this.countTachesMauvais);
  //       console.log("mmmmyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy"+this.countTachesMoyen);
        
  //       this.checkAndUpdateChartData();  // Mettre à jour les données du graphique une fois toutes les données chargées
  //     }).catch(error => {
  //       console.error('Erreur lors du chargement des counts:', error);
  //     });
  //   }
  // }
  

  loadCountTaches(score: string): Promise<number> {
    return new Promise((resolve, reject) => {
      if (this.userConnectedId) {
        console.log(`Tentative de chargement du count pour score: ${score}`);
        this.taskService.getCountTachesByScoreAndStagiaireId(this.userConnectedId, score)
          .subscribe(
            (count: number) => {
              console.log(`Count reçu pour score ${score}: ${count}`);
              resolve(count);
            },
            error => {
              console.error(`Erreur lors de la récupération du count pour score ${score}:`, error);
              reject(error);
            }
          );
      } else {
        console.error('userConnectedId est undefined');
        resolve(0);
      }
    });
  }

  loadTaskCounts(): void {
    // Appel des fonctions et assignation des valeurs, puis initialisation du graphique
    Promise.all([
      this.loadCountTaches('Bon'),
      this.loadCountTaches('Moyen'),
      this.loadCountTaches('Mauvais')
    ]).then(([countBon, countMoyen, countMauvais]) => {
      this.countTachesBon = countBon;
      this.countTachesMoyen = countMoyen;
      this.countTachesMauvais = countMauvais;

      this.initPieChart(); // Initialisation du pie chart une fois les valeurs chargées
    }).catch(error => {
      console.error('Erreur lors du chargement des counts:', error);
    });
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


  

  checkAndUpdateChartData(): void {
    if (this.countTachesBon !== undefined && this.countTachesMoyen !== undefined && this.countTachesMauvais !== undefined) {
      this.updateChartData();
    }
  }

  updateChartData(): void {
    this.doughnutChartData = [this.countTachesBon, this.countTachesMoyen, this.countTachesMauvais];
   
    console.log('Mise à jour des données du graphique:', this.doughnutChartData);
    this.createDoughnutChart();
  }

  createDoughnutChart(): void {
    const ctx = document.getElementById('doughnutChart') as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Bon', 'Moyen', 'Mauvais'],
          datasets: [{
            label: 'Doughnut Chart',
            data: this.doughnutChartData,
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1
          }]
        },
        options: this.doughnutChartOptions
      });
    }
  }

  loadSatisfactionValue(stagiaireId: number): void {
    this.http.get<number>(`http://localhost:8089/PFE/Satisfaction/calculer/${stagiaireId}`).subscribe(value => {
      // Arrondir la valeur avant de l'utiliser
      this.satisfactionValue = Math.round(value);  // Utilisez Math.ceil() pour arrondir au supérieur ou Math.floor() pour l'inférieur
      console.log('Valeur de satisfaction arrondie:', this.satisfactionValue);
      this.createCircularCounter(); // Appeler la méthode après avoir récupéré la valeur
    }, error => {
      console.error('Erreur lors de la récupération de la valeur de satisfaction:', error);
    });
  }


  loadPerfermance(stagiaireId: number): void {
    this.http.get<number>(`http://localhost:8089/PFE/Satisfaction/estimerPerformance/${stagiaireId}`).subscribe(value => {
      // Arrondir la valeur avant de l'utiliser
      this.perfValue = Math.round(value);  // Utilisez Math.ceil() pour arrondir au supérieur ou Math.floor() pour l'inférieur
      console.log('Valeur de perfermance arrondie:', this.perfValue);
      this.createCircularCounter(); // Appeler la méthode après avoir récupéré la valeur
    }, error => {
      console.error('Erreur lors de la récupération de la valeur de satisfaction:', error);
    });
  }
  


  createCircularCounter(): void {
    const canvas = document.getElementById('counterCanvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = 210;
      const startAngle = 0;
      const endAngle = 2 * Math.PI;
      const counterValue = this.satisfactionValue;
      const counterRemaining = 100 - counterValue;

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.strokeStyle = '#EAEAEA';
      ctx.lineWidth = 45;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, startAngle, endAngle * (counterValue / 100));
      ctx.strokeStyle = 'rgba(255, 99, 132, 1)';
      ctx.lineWidth = 30;
      ctx.stroke();

      ctx.font = '24px Arial';
      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${counterValue}%`, centerX, centerY);

      ctx.font = '16px Arial';
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(`Restant: ${counterRemaining}%`, centerX, centerY + 30);
    }
  }
  loadPonctualite(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.userConnectedId) {
        fetch(`http://localhost:8089/PFE/Reunion/calculerPonctualite/${this.userConnectedId}`)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            this.ponctualite = data; // Normalize to 5
            console.log("ponc: " + this.ponctualite); // Log after fetching
            resolve();
          })
          .catch(error => {
            console.error('Erreur lors du calcul de la ponctualité', error);
            reject(error);
          });
      } else {
        reject(new Error('User ID is undefined'));
      }
    });
  }
  

  loadPresence(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.userConnectedId) {
        fetch(`http://localhost:8089/PFE/Reunion/calculerPresence${this.userConnectedId}`)
          .then(response => response.json())
          .then(data => {
            this.presence = data || 0; // Fallback to 0 if undefined
            console.log('Presence:', this.presence); // Log after fetching
            resolve();
          })
          .catch(error => {
            console.error('Erreur lors du calcul de la présence', error);
            reject(error);
          });
      } else {
        reject(new Error('User ID is undefined'));
      }
    });
  }
  
  loadSerieux(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.userConnectedId) {
        fetch(`http://localhost:8089/PFE/Satisfaction/estimerPerformance/${this.userConnectedId}`)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            this.serieux = data; // Normalize to 5
            console.log("ser: " + this.serieux); // Log after fetching
            resolve();
          })
          .catch(error => {
            console.error('Erreur lors du calcul du sérieux', error);
            reject(error);
          });
      } else {
        reject(new Error('User ID is undefined'));
      }
    });
  }
  
  // New method to load both values and create the chart
  loadDataAndCreateChart(): void {
    Promise.all([this.loadPonctualite(), this.loadSerieux(), this.loadPresence()])
      .then(() => {
        this.createRadarChart(); // Créez le graphique radar après le chargement de toutes les valeurs
      })
      .catch(error => {
        console.error('Erreur lors du chargement des données', error);
      });
  }
  
  
  
 
  
  private chartValues: number[] = [5, 3, 4, 4, 3]; // Valeurs par défaut

  updateChartValues(): void {
      this.chartValues = [
          this.ponctualite !== undefined ? this.ponctualite : 0,
          this.serieux !== undefined ? this.serieux : 0,
          this.presence !== undefined ? this.presence : 0,
          4, // Valeur fictive pour Compétence 4
          3  // Valeur fictive pour Compétence 5
      ];
  
      // Log des valeurs mises à jour
      console.log('Valeurs mises à jour pour chartValues:', this.chartValues);
  }
  






  private radarChart: Chart | null = null;

  createRadarChart(): void {
    const ctx = document.getElementById('radarChart') as HTMLCanvasElement;

    // Log the values for debugging
    console.log('Valeurs pour le graphique radar:', this.chartValues);

    // Ensure ctx exists before creating the chart
    if (ctx) {
        // Destroy previous instance if it exists
        if (this.radarChart) {
            this.radarChart.destroy();
        }

        // Create a new chart instance
        this.radarChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Ponctualité', 'Sérieux', 'Présence', 'communication', 'Compétence 5'],
                datasets: [{
                    label: 'Performance Stagiaire',
                    data: this.chartValues, // Use the predefined values
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    r: {
                        suggestedMin: 0,
                        suggestedMax: 5
                    }
                }
            }
        });
    } else {
        console.error('Le contexte du canvas est nul. Vérifiez l\'ID de votre élément canvas.');
    }
}

  
  // calculerTempsRestant(stage: Stage): void {
  //   this.taskService.calculerTempsRestant(stage).subscribe(
  //     (response: string) => {
  //       this.tempsRestant = response;
  //       console.log('Temps restant pour le stage:', this.tempsRestant);
  //       this.updateCountdown();
  //     },
  //     (error) => {
  //       console.error('Erreur lors du calcul du temps restant', error);
  //     }
  //   );
  // }

  getTempsRestant(stagiaireId: number): void {
    const url = `http://localhost:8089/PFE/stage/calculer/${this.userConnectedId}`; // URL de l'API avec stagiaireId dynamique
  
    this.http.post(url, {}, { responseType: 'text' }).subscribe(
      (data: string) => {
        this.tempsRestant = data;
        this.updateCountdown(data);
      },
      (error) => {
        console.error('Erreur lors du calcul du temps restant :', error);
      }
    );
  }
  
  updateCountdown(tempsRestant: string): void {
    const [jours, heures, minutes] = this.parseTempsRestant(tempsRestant);
  
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
  
    if (daysElement) daysElement.textContent = jours.toString();
    if (hoursElement) hoursElement.textContent = heures.toString();
    if (minutesElement) minutesElement.textContent = minutes.toString();
  }
  
  parseTempsRestant(tempsRestant: string): [number, number, number] {
    const regex = /(\d+) jours, (\d+) heures et (\d+) minutes/;
    const match = regex.exec(tempsRestant);
  
    if (match) {
      return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
    }
    return [0, 0, 0];
  }
  



  createPieChart(): void {
    const ctx = document.getElementById('pieChart') as HTMLCanvasElement;
    if (ctx && this.countTachesBon + this.countTachesMoyen + this.countTachesMauvais > 0) {
      if (this.pieChart) this.pieChart.destroy();  // Détruire le graphique existant s'il existe
      this.pieChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Bon', 'Moyen', 'Mauvais'],
          datasets: [{
            data: [6, 5, 4],
            backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'], // Bleu, Jaune, Rose
            borderColor: ['#36A2EB', '#FFCE56', '#FF6384'],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top'
            },
          }
        } as ChartOptions
      });
    }
  }


  loadDashboardSummary(stagiaireId: number): void {
    this.http.get<any>(`http://localhost:8089/PFE/Satisfaction/summary/${this.userConnectedId}`).subscribe(
      (data) => {
        this.totalTasks = data.totalTasks;
        this.plannedMeetings = data.plannedMeetings;
        this.uncompletedTasks = data.uncompletedTasks;
        this.acceptedMeetings = data.acceptedMeetings;
        this.declinedMeetings = data.declinedMeetings;
        this.pourcentageCompleted = data.completedTasksPercentage;

        console.log("Total Tasks:", this.totalTasks);
        console.log("Planned Meetings:", this.plannedMeetings);
        console.log("Uncompleted Tasks:", this.uncompletedTasks);
        console.log("Accepted Meetings:", this.acceptedMeetings);
        console.log("Declined Meetings:", this.declinedMeetings);
      },
      (error) => {
        console.error('Error loading dashboard summary:', error);
      }
    );
  }

}
