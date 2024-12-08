import { Component, OnInit } from '@angular/core';
import { TacheServiceService } from '../tache-service.service';
import { Tache } from '../Models/Tache';
import { User } from '../Models/user';
import { AuthServiceService } from '../auth-service.service';
import { catchError, of, switchMap } from 'rxjs';
import { MarkTaskCompletionRequest } from '../Models/MarkTaskCompletionRequest';
import { Router } from '@angular/router';

@Component({
  selector: 'app-taches-stagaire',
  templateUrl: './taches-stagaire.component.html',
  styleUrls: ['./taches-stagaire.component.css']
})
export class TachesStagaireComponent implements OnInit {
  userConnected: User | null = null;
  // stagiaireId: number=4;
  tasks: Tache[] = [];
  // taskId!: number;
  constructor(private taskService: TacheServiceService,private authService: AuthServiceService, private router: Router,){}
  ngOnInit(): void {
    console.log("idd"+this.userConnected?.id);
    
    this.authService.getUserDetails().pipe(
      switchMap((userDetails: User | null) => {
        this.userConnected = userDetails;
        console.log("User Details:", JSON.stringify(this.userConnected));

        if (this.userConnected && this.userConnected.id !== undefined) {
          return this.taskService.getTachesStagiaire(this.userConnected.id);
        } else {
          console.error("User ID is undefined");
          return of([]); // Return an empty array in case of error
        }
      }),
      catchError(error => {
        console.error("Error fetching tasks:", error);
        return of([]); // Handle error by returning an empty array
      })
    ).subscribe(
      (tasks: Tache[]) => {
        this.tasks = tasks;
        console.log("Tasks:", this.tasks);
      },
      error => {
        console.error("Error in subscription:", error);
      }
    );
  }


  markAsCompleted(taskId: number): void {
    const request: MarkTaskCompletionRequest = {
      taskId: taskId,
      completionDate: new Date() // Date actuelle
    };

    this.taskService.markTaskAsCompleted(request).subscribe(
      () => {
        console.log('Task marked as completed successfully');
        alert('Task marked as completed successfully');
        // Update the task status locally
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
          task.terminee = true;
          task.dateTermine = request.completionDate;
        }
      },
      error => {
        console.error('Error marking task as completed', error);
        alert('Error marking task as completed');
      }
    );
    this.router.navigate(['/TachesStagiaire']);
  }
      }
  


