import { Component, OnInit } from '@angular/core';
import { User } from '../Models/user';
import { UserServiceService } from '../user-service.service';
import { HttpClient } from '@angular/common/http';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-encadrant-page',
  templateUrl: './encadrant-page.component.html',
  styleUrls: ['./encadrant-page.component.css']
})
export class EncadrantPageComponent implements OnInit {

  tuteur: User = new User;

  userConnected: User | null = null;

  selectedFile!: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  
  imageName: any;

  constructor(private userService: UserServiceService,private httpClient : HttpClient,private authService: AuthServiceService) { }
  ngOnInit(): void {
    this.authService.getUserDetails().subscribe(
      (user: User | null) => {
        if (user) {
          this.userConnected = user;
          this.loadTuteur(user.id);
        }
      },
      error => {
        console.error('Error fetching user details:', error);
      }
    );
  }

  loadTuteur(stagiaireId: number): void {
    this.userService.getTuteurOfStagiaire(stagiaireId).subscribe(
      (tuteur: User) => {
        this.tuteur = tuteur;
        console.log('Tuteur du stagiaire:', tuteur);
        this.getImage(tuteur.imageName, tuteur);
        console.log("User image: ", tuteur.imageName);
      },
      error => {
        console.error('Error fetching tuteur:', error);
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

 
    
  }




