import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { User } from '../Models/user';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-testeur-component',
  templateUrl: './testeur-component.component.html',
  styleUrls: ['./testeur-component.component.css']
})
export class TesteurComponentComponent implements OnInit {
 
  users: User[] = [];
  modal: any;
  
  message: string = '';

  user!: User ;

  
  selectedFile!: File;
retrievedImage: any;
base64Data: any;
retrieveResonse: any;

imageName: any;
  
  constructor(private userService:UserServiceService,private router: Router,private modalService: NgbModal,private httpClient : HttpClient) {}
  ngOnInit(): void {
    console.log("recuperation");
    
    this.getTests() ;
    console.log("userssss"+this.users);
    
  }



  // private modalService = inject(NgbModal);

  openVerticallyCentered(content: TemplateRef<any>,User: User) {
    this.user = User;
		this.modalService.open(content, { centered: true });

	}

  
  openModal() {
    this.modal.nativeElement.show();
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  


 

  addStagiaire(User: User): void {
    // this.userService.addStagiaire(User)
    //   .subscribe(
    //     (response) => {
    //       console.log('Utilisateur ajouté avec succès:', response);
    //       this.message = 'Utilisateur ajouté avec succès';
    //       window.confirm('Ajout comme stagiaire réussi.');
    //     },
    //     (error) => {
    //       console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
    //       this.message = 'Erreur lors de l\'ajout de l\'utilisateur';
    //       window.confirm('Ajout comme stagiaire réussi.');
    //     }
    //   );
    this.router.navigate(['/addStagiaire'], { state: { User } });
  }



  // getTests(): void {
  //   this.userService.getAlltesters()
  //     .subscribe(
  //       demandes => {
  //         this.users = demandes;
  //         console.log('Demandes récupérées avec succès :', demandes);
          
          
  //       },
  //       error => {
  //         console.error('Erreur lors de la récupération des demandes :', error);
  //       }
  //     );
  // }

  getTests(): void {
    this.userService.getAlltesters()
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
