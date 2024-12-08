import { Component, OnInit } from '@angular/core';
import { DemandeServiceService } from '../demande-service.service';
import { UserServiceService } from '../user-service.service';
import { HttpClient } from '@angular/common/http';
import { Demande } from '../Models/Demande';
import { User } from '../Models/user';

@Component({
  selector: 'app-tuteurs-admin-component',
  templateUrl: './tuteurs-admin-component.component.html',
  styleUrls: ['./tuteurs-admin-component.component.css']
})
export class TuteursAdminComponentComponent implements OnInit {
 
  demandes: Demande[] = [];
  users: User[] = [];

  produit!: User;
  message: string = '';


  
selectedFile!: File;
retrievedImage: any;
base64Data: any;
retrieveResonse: any;

imageName: any;
 
 
 
 
  constructor(private demandeService: DemandeServiceService,private userService:UserServiceService,private httpClient : HttpClient) { }
  ngOnInit(): void {
    this.getDemandes();
  }





  getDemandes(): void {
    this.userService.getAlltuteurs()
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

}


