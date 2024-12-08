import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from '../user-service.service';
import { User } from '../Models/user';
import { Stage } from '../Models/Stage';
import { StagiaireRequest } from '../Models/StagiaireRequest';

@Component({
  selector: 'app-add-stagiaire',
  templateUrl: './add-stagiaire.component.html',
  styleUrls: ['./add-stagiaire.component.css']
})
export class AddStagiaireComponent implements OnInit {

  tuteurs: User[] = [];
  stagiaire: any = {};
  stage: Stage = new Stage();
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserServiceService // Inject your UserService
  ) { }

  ngOnInit(): void {
    // Retrieve the selected tester data from ActivatedRoute's state
    this.stagiaire = history.state.User;
    console.log("stagiaire", this.stagiaire);

    this.userService.getAlltuteurs().subscribe(
      (data: User[]) => {
        this.tuteurs = data;
        console.log("tuteursss============="+this.tuteurs);
        
      },
      (error) => {
        console.error('Erreur lors du chargement des tuteurs', error);
      }
    );
    console.log("stage =============="+this.stage);
    
  }

  // Method to submit the add stagiaire form
  // onSubmit(): void {
  //   // Send the stagiaire data to your backend for adding
  //   this.userService.addStagiaire(this.stagiaire).subscribe(
  //     (response: any) => {
  //       console.log('Stagiaire added successfully:', response);
  //       // Redirect the user to another page after successful addition
  //       this.router.navigate(['/listeStagiaires']);
  //     },
  //     (error: any) => {
  //       console.error('Error adding stagiaire:', error);
  //       // Handle errors here, e.g., show an error message to the user
  //     }
  //   );
  // }
  onSubmit(): void {
    const stagiaireRequest = new StagiaireRequest();
    stagiaireRequest.user = this.stagiaire;
    stagiaireRequest.stage = this.stage;

    // Send the stagiaire data to your backend for adding
    this.userService.addStagiaireRequest(stagiaireRequest).subscribe(
      (response: any) => {
        console.log('Stagiaire added successfully:', response);
        // Redirect the user to another page after successful addition
         this.router.navigate(['/listeStagiaires']);
      },
      (error: any) => {
        console.error('Error adding stagiaire:', error);
        console.log("stagiaire erreur"+stagiaireRequest);
        
        console.log("stagiaire erreur" + JSON.stringify(stagiaireRequest));

        // Handle errors here, e.g., show an error message to the user
      }
    );
     window.location.reload() ;
     this.router.navigate(['/listeStagiaires']);
  }
}
