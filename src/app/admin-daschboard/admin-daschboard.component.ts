import { Component } from '@angular/core';
import { Tache } from '../Models/Tache';
import { Chart, ChartOptions, ChartType } from 'chart.js';
import { TacheServiceService } from '../tache-service.service';
import { ChartComponentService } from '../chart-component.service';

@Component({
  selector: 'app-admin-daschboard',
  templateUrl: './admin-daschboard.component.html',
  styleUrls: ['./admin-daschboard.component.css']
})
export class AdminDaschboardComponent {
  stagiaireId: number=4;
  tasks: any[] = [];
  taches: Tache[] = [];
  countTachesMoyen: number=3;
  countTachesBon: number=2;
  countTachesMauvais: number=3;

  stagesTermines!: number;
  pourcentageTermines!: number;

  stagesEncours!: number;
  pourcentageEncours!: number;

  faculteAnalysis: any[] = [];

  conversionRate!: number;
  universityAnalysis!: Map<string, Map<string, Object>>;
  stagesAnalysis!: Map<string, Object>;

  // Données du graphique en anneau
  // public doughnutChartLabels: Label[] = ['Bon', 'Moyen', 'Mauvais'];
  public doughnutChartData:  number[] = [0, 0, 0];; // Exemple de données (à remplacer par vos propres données)
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false
    // Autres options de configuration du graphique
  };

  constructor(private taskService: TacheServiceService,private chartService: ChartComponentService) {}

  ngOnInit() {

    const stagiaireId = 4; // Remplacez par l'ID du stagiaire approprié
    const scoreMoyen = 'Moyen'; // Remplacez par le score approprié
    this.taskService.getCountTachesByScoreAndStagiaireId(stagiaireId, scoreMoyen)
      .subscribe(
        (count: number) => {
          console.log("la valeuuuuurrrrr "+count);
          
          this.countTachesMoyen = this.countTachesMoyen+count;
          console.log('Nombre de tâches avec le score "Moyen":*******', this.countTachesMoyen);
        },
        error => {
          console.error('Une erreur s\'est produite lors de la récupération du nombre de tâches moyennes:', error);
        }
      );

      // Remplacez par l'ID du stagiaire approprié
      const scoreMauvais = 'Mauvais'; // Remplacez par le score approprié
      this.taskService.getCountTachesByScoreAndStagiaireId(stagiaireId, scoreMauvais)
        .subscribe(
          (count: number) => {
            console.log("la valeuuuuurrrrr "+count);
            
            this.countTachesMauvais = this.countTachesMauvais+count;
            console.log('Nombre de tâches avec le score "Moyen":*******', this.countTachesMoyen);
          },
          error => {
            console.error('Une erreur s\'est produite lors de la récupération du nombre de tâches moyennes:', error);
          }
        );

        const scoreBon = 'Bon'; // Remplacez par le score approprié
        this.taskService.getCountTachesByScoreAndStagiaireId(stagiaireId, scoreBon)
          .subscribe(
            (count: number) => {
              console.log("la valeuuuuurrrrr "+count);
              
              this.countTachesBon = this.countTachesBon+count;
              console.log('Nombre de tâches avec le score "Moyen":*******', this.countTachesMoyen);
            },
            error => {
              console.error('Une erreur s\'est produite lors de la récupération du nombre de tâches moyennes:', error);
            }
          );
  
  
  
  
  
  
  




  
  
    //  this.loadTachesCountBon();
   this.loadCountTachesMoyen();
   this.loadCountTachesMauvais();
   this.loadCountTachesBon();
   console.log("----"+this.countTachesMoyen);
  //  this.loadTachesCountMoyen();


    
    
    
    
    
    
  //  this.loadStagiaireTasks();
   this.createDoughnutChart();
   this.createRadarChart();
   this.createCircularCounter();
    // this.updateChartData();

    this.getConversionRate();
    // this.getUniversityAnalysis();
    this.getStagesAnalysiss();
    this.getFaculteAnalysis();
    
  }


  loadTachesCountBon(): void {
    const stagiaireId = 4; // Remplacez par l'ID du stagiaire approprié
    const score = 'Bon'; // Remplacez par le score approprié
    this.taskService.getCountByScoreAndStagiaireId(stagiaireId, score).subscribe(
      (count: number) => {
        // Utilisez la variable count pour effectuer les actions nécessaires
        console.log('Nombre de tâches avec le score "Bon":', count);
        return count ;
      },
      error => {
        console.error('Une erreur s\'est produite lors de la récupération du nombre de tâches:', error);
      }
    );
  }

  loadTachesCountMoyen(): void {
    const stagiaireId = 4; // Remplacez par l'ID du stagiaire approprié
    const score = 'Moyen'; // Remplacez par le score approprié
    this.taskService.getCountByScoreAndStagiaireId(stagiaireId, score).subscribe(
      (count: number) => {
        // Utilisez la variable count pour effectuer les actions nécessaires
        console.log('Nombre de tâches avec le score "Moyen":', count);
        return count ;
      },
      error => {
        console.error('Une erreur s\'est produite lors de la récupération du nombre de tâches:', error);
      }
    );
  }


  // loadTachesCountMauvais(): void {
  //   const stagiaireId = 4; // Remplacez par l'ID du stagiaire approprié
  //   const score = 'Mauvais'; // Remplacez par le score approprié
  //   this.taskService.getCountByScoreAndStagiaireId(stagiaireId, score).subscribe(
  //     (count: number) => {
  //        console.log('Nombre de tâches avec le score "Mauvais":', count);
  //        count 
  //       // Utilisez la variable count pour effectuer les actions nécessaires
        
  //     },
  //     error => {
  //       console.error('Une erreur s\'est produite lors de la récupération du nombre de tâches:', error);
  //     }
  //   );
  // }

  loadCountTachesMoyen(): void {
    const stagiaireId = 4; // Remplacez par l'ID du stagiaire approprié
    const scoreMoyen = 'Moyen'; // Remplacez par le score approprié
    this.taskService.getCountTachesByScoreAndStagiaireId(stagiaireId, scoreMoyen)
      .subscribe(
        (count: number) => {
          console.log("la valeuuuuurrrrr "+count);
          
          this.countTachesMoyen = this.countTachesMoyen+count;
          console.log('Nombre de tâches avec le score "Moyen":*******', this.countTachesMoyen);
        },
        error => {
          console.error('Une erreur s\'est produite lors de la récupération du nombre de tâches moyennes:', error);
        }
      );
  }

  loadCountTachesMauvais(): void {
    const stagiaireId = 4; // Remplacez par l'ID du stagiaire approprié
    const scoreMauvais = 'Mauvais'; // Remplacez par le score approprié
    this.taskService.getCountTachesByScoreAndStagiaireId(stagiaireId, scoreMauvais)
      .subscribe(
        (count: number) => {
          console.log("la valeuuuuurrrrr "+count);
          
          this.countTachesMauvais = this.countTachesMauvais+count;
          console.log('Nombre de tâches avec le score "Moyen":*******', this.countTachesMoyen);
        },
        error => {
          console.error('Une erreur s\'est produite lors de la récupération du nombre de tâches moyennes:', error);
        }
      );
  }

  loadCountTachesBon(): void {
    const stagiaireId = 4; // Remplacez par l'ID du stagiaire approprié
    const scoreBon = 'Bon'; // Remplacez par le score approprié
    this.taskService.getCountTachesByScoreAndStagiaireId(stagiaireId, scoreBon)
      .subscribe(
        (count: number) => {
          console.log("la valeuuuuurrrrr "+count);
          
          this.countTachesBon = this.countTachesBon+count;
          console.log('Nombre de tâches avec le score "Moyen":*******', this.countTachesMoyen);
        },
        error => {
          console.error('Une erreur s\'est produite lors de la récupération du nombre de tâches moyennes:', error);
        }
      );
  }

  createCircularCounter(): void {
    const canvas = document.getElementById('counterCanvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
  
    if (ctx) {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = 210; // rayon du cercle
      const startAngle = 0;
      const endAngle = 2 * Math.PI;
      const counterValue = 75; // la valeur du compteur en pourcentage
      const counterRemaining = 100 - counterValue;
  
      // Dessiner le cercle extérieur
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.strokeStyle = '#EAEAEA'; // couleur du contour
      ctx.lineWidth = 45; // épaisseur du contour
      ctx.stroke();
  
      // Dessiner le compteur circulaire
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, startAngle, endAngle * (counterValue / 100));
      ctx.strokeStyle = 'rgba(255, 99, 132, 1)'; // couleur du contour
      ctx.lineWidth = 30; // épaisseur du contour
      ctx.stroke();
  
      // Dessiner le texte au centre du compteur
      ctx.font = '24px Arial';
      ctx.fillStyle = '#FFFFFF'; // couleur du texte
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${counterValue}%`, centerX, centerY);
  
      // Dessiner le texte pour la valeur restante
      ctx.font = '16px Arial';
      ctx.fillStyle = '#FFFFFF'; // couleur du texte
      ctx.fillText(`Restant: ${counterRemaining}%`, centerX, centerY + 30);
    }
  }

  createRadarChart(): void {
    const ctx = document.getElementById('radarChart') as HTMLCanvasElement;
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Ponctualite', 'serieusite', 'Presence', 'Compétence 4', 'Compétence 5'],
            datasets: [{
                label: 'Radar Chart',
                data: [5, 4, 3, 2, 1], // Remplacez ces valeurs par vos propres données
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
}




 createDoughnutChart(): void {
    const doughnutChart = new Chart('doughnutChart', {
      type: 'doughnut',
      data: {
        labels: ['Bon', 'Moyen', 'Mauvais'],
        datasets: [{
          label: 'Doughnut Chart',
          data: [this.countTachesBon, this.countTachesMoyen, this.countTachesMauvais],
          // data: [320, 367, 434],
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
    
    });
  }

  // loadStagiaireTasks() {
  //   this.taskService.getTachesStagiaire(this.stagiaireId).subscribe(
  //     (data: any[]) => {
  //       this.tasks = data;
  //       this.updateChartData();
  //     },
  //     (      error: any) => {
  //       console.log(error);
  //     }
  //   );
  // }

  // updateChartData() {
  //   // Réinitialiser les données du graphique
  //   this.doughnutChartData = [0, 0, 0];

  //   // Mettre à jour les données du graphique en fonction des scores des tâches
  //   this.tasks.forEach(task => {
  //     switch(task.score) {
  //       case 'Bon':
  //         this.doughnutChartData[0]++;
  //         break;
  //       case 'Moyen':
  //         this.doughnutChartData[1]++;
  //         break;
  //       case 'Mauvais':
  //         this.doughnutChartData[2]++;
  //         break;
  //       default:
  //         break;
  //     }
  //   });
  // }

  loadStagiaireTasks() {
    this.taskService.getTachesStagiaire(this.stagiaireId).subscribe(
      (data: Tache[]) => {
        this.tasks = data;
        console.log("data"+data);
        console.log("tasks"+this.tasks);
        
        
        this.updateChartData();
      },
      error => {
        console.log(error);
      }
    );
  }

  updateChartData() {
    // Réinitialiser les données du graphique
    this.doughnutChartData = [0, 0, 0];

    // Mettre à jour les données du graphique en fonction des scores des tâches
    this.tasks.forEach(task => {
      switch(task.score) {
        case 'Bon':
          this.doughnutChartData[0]++;
          break;
        case 'Moyen':
          this.doughnutChartData[1]++;
          break;
        case 'Mauvais':
          this.doughnutChartData[2]++;
          break;
        default:
          break;
      }
    });
  }



  getConversionRate(): void {
    this.chartService.calculateConversionRate().subscribe(
      (rate: number) => {
        this.conversionRate = rate;
      },
      error => {
        console.error('Error fetching conversion rate:', error);
      }
    );
  }

  getFaculteAnalysis(): void {
    this.chartService.getUniversityAnalysis().subscribe(
      (data: any) => {
        // Supposons que vous recevez des données au format approprié (voir service)
        this.faculteAnalysis = Object.keys(data).map(key => ({
          faculte: key,
          count: data[key].count,
          percentage: data[key].percentage
        }));
      },
      error => {
        console.error('Erreur lors de la récupération de l\'analyse des universités :', error);
      }
    );
  }

  getStagesAnalysis(): void {
    this.chartService.getStagesAnalysis().subscribe(
      (analysis: Map<string, Object>) => {
        this.stagesAnalysis = analysis;
      },
      error => {
        console.error('Error fetching stages analysis:', error);
      }
    );
  }

  getStagesAnalysiss(): void {
    this.chartService.getStagesAnalysis().subscribe(
      (data: any) => {
        console.log("data" +JSON.stringify(data));
        
        this.stagesTermines = data.stagesTermines;
        this.pourcentageTermines = data.pourcentageTermines;
        this.stagesEncours = data.stagesEnCours;
        this.pourcentageEncours = data.pourcentageEnCours;
      },
      error => {
        console.error('Error fetching stages analysis:', error);
      }
    );
  }

  // getStageEncours(): void {
  //   this.chartService.getStagesAnalysis().subscribe(
  //     (data: any) => {
  //       this.stagesTermines = data.stagesEncours;
  //       this.pourcentageTermines = data.pourcentageEncours;
  //     },
  //     error => {
  //       console.error('Error fetching stages analysis:', error);
  //     }
  //   );
  // }

}



