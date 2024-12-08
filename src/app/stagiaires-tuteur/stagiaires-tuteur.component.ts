import { Component, OnInit } from '@angular/core';
import { User } from '../Models/user';
import { UserServiceService } from '../user-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-stagiaires-tuteur',
  templateUrl: './stagiaires-tuteur.component.html',
  styleUrls: ['./stagiaires-tuteur.component.css']
})
export class StagiairesTuteurComponent implements OnInit {

  users: User[] = [];
  idTuteur : number = 3 ;



  selectedFile!: File;
retrievedImage: any;
base64Data: any;
retrieveResonse: any;

imageName: any;

selectedUser: User | null = null;

  constructor(private userService: UserServiceService,private httpClient : HttpClient) { }
  ngOnInit(): void {

    this.userService.getStagiairesByTuteur(this.idTuteur)
    .subscribe(
      demandes => {
        this.users = demandes;
        console.log('Demandes récupérées avec succès :', demandes);
        this.users.forEach(user => {
          if (user.imageName) {
            this.getImage(user.imageName, user);
            console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            
            console.log("user image"+ user.imageName);
            
          }
        });
      },
      error => {
        console.error('Erreur lors de la récupération des demandes :', error);
      }
    );
   
  }

  getImage(imageName: string ,produit:User) {
    this.httpClient.get('http://localhost:8089/PFE/image/get/' + imageName)
      .subscribe(
        res => {
           this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
          console.log("zzzzzzzzzzzzzzzzzzzzzz"+this.retrievedImage);
          
         produit.retriev = this.retrievedImage ;
        }
      );
  }


  showDetails(user: User): void {
    this.selectedUser = user;
  }

  hideDetails(): void {
    this.selectedUser = null;
  }

  
}
