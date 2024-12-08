import { Component, OnInit } from '@angular/core';
import { DemandeServiceService } from '../demande-service.service';
import { Demande } from '../Models/Demande';
import { User } from '../Models/user';
import { UserServiceService } from '../user-service.service';
import { HttpClient } from '@angular/common/http';
import { AuthServiceService } from '../auth-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-condidats',
  templateUrl: './list-condidats.component.html',
  styleUrls: ['./list-condidats.component.css']
})
export class ListCondidatsComponent implements OnInit {
  demandes: Demande[] = [];
  users: User[] = [];

  produit!: User;
  message: string = '';


  
selectedFile!: File;
retrievedImage: any;
base64Data: any;
retrieveResonse: any;

imageName: any;
selectedUser: User | null = null;

user : Observable<User | null> | undefined;


  constructor(private demandeService: DemandeServiceService,private userService:UserServiceService,private httpClient : HttpClient,private authService: AuthServiceService) { }
  ngOnInit(): void {
    this.getDemandes();
    this.user = this.authService.getUserDetails();
   // console.log("user connecté"+this.user);
   console.log("loccccccoooooooooooooooooooo :"+localStorage.getItem('user'));
   
    
    // console.log(this.produit);
    // this.getImage(this.produit.imageName,this.produit);
  }

  addTOtest(user : User): void {
    this.userService.addTest(user)
      .subscribe(
        (response) => {
          console.log('Utilisateur ajouté avec succès:', response);
          this.message = 'Utilisateur ajouté avec succès';
          // this.user = new User(); // Réinitialiser les champs du formulaire
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
          this.message = 'Erreur lors de l\'ajout de l\'utilisateur';
        }
      );
  }


  // getDemandes(): void {
  //   this.userService.getAllCONDIDATS()
  //   .subscribe(
  //     demandes => {
  //       this.users = demandes;
  //       console.log('Demandes récupérées avec succès :', demandes);
        
        
  //     },
  //     error => {
  //       console.error('Erreur lors de la récupération des demandes :', error);
  //     }
  //   );
  // }

  // getDemandes(): void {
  //   this.userService.getAllCONDIDATS()
  //     .subscribe(
  //       demandes => {
  //         this.users = demandes;
  //         console.log('Demandes récupérées avec succès :', demandes);
  //         this.users.forEach(user => {
  //           if (user.imageName) {
  //             this.getImage(user.imageName, user);
  //           }
  //         });
  //       },
  //       error => {
  //         console.error('Erreur lors de la récupération des demandes :', error);
  //       }
  //     );
  // }
  // getImage(imageName: string ,produit:User) {
  //   this.httpClient.get('http://localhost:8089/PFE/image/get/' + imageName)
  //     .subscribe(
  //       res => {
  //          this.retrieveResonse = res;
  //         this.base64Data = this.retrieveResonse.picByte;
  //         this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
          
  //        produit.retriev = this.retrievedImage ;
  //        console.log("image");
         
  //       }
  //     );
  // }

  // getImage(imageName: string, user: User) {
  //   this.httpClient.get(`http://localhost:8089/PFE/image/get/${imageName}`, { responseType: 'blob' })
  //     .subscribe(
  //       res => {
  //         const reader = new FileReader();
  //         reader.readAsDataURL(res);
  //         reader.onloadend = () => {
  //           user.retriev = reader.result as string;
  //           console.log(`Image retrieved for ${imageName}`);
  //         };
  //       },
  //       error => {
  //         console.error(`Erreur lors de la récupération de l'image ${imageName}:`, error);
  //       }
  //     );
  // }


  getDemandes(): void {
    this.userService.getAllCONDIDATS()
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

  // getImage(imageName: string, user: User) {
  //   const url = `http://localhost:8089/PFE/image/get/${imageName}`;
  //   console.log("uuuuurrrrrllllllll"+url);
  //    // Création de l'URL avec le nom de l'image
  //   this.httpClient.get(url, { responseType: 'blob' })
  //     .subscribe(
  //       response => {
  //         const reader = new FileReader();
  //         reader.readAsDataURL(response);
  //         reader.onloadend = () => {
  //           user.retriev = reader.result as string;
  //           const imageUrl = URL.createObjectURL(response); // Création de l'URL de l'image à partir du blob
  //           console.log(`Image retrieved for ${imageName}`);
  //           console.log(`URL of retrieved image: ${imageUrl}`); // Logging de l'URL dans la console
  //         };
  //       },
  //       error => {
  //         console.error(`Erreur lors de la récupération de l'image ${imageName}:`, error);
  //       }
  //     );
  // }

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
