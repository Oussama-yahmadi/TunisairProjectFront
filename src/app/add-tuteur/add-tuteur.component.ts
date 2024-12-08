import { Component } from '@angular/core';
import { User } from '../Models/user';
import { DemandeServiceService } from '../demande-service.service';
import { UserServiceService } from '../user-service.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-tuteur',
  templateUrl: './add-tuteur.component.html',
  styleUrls: ['./add-tuteur.component.css']
})
export class AddTuteurComponent {

  nouvelleDemande: User = new User;

  imageFile!: File ;

 
  
    form !: File ;
    
      selectedFile!: File;
      retrievedImage: any;
      base64Data: any;
      retrieveResonse: any;
      message!: string;
      imageName: any;




  constructor(private userService: UserServiceService,private router :Router,private httpClient: HttpClient) { }



  addProduct(product: User, imageName: string): void {
    this.userService.addProduct(this.nouvelleDemande, imageName)
      .subscribe(
        response => {
          console.log('Le produit a été ajouté avec succès:', response);
        
         
          // Gérer la réponse ici, par exemple rediriger vers une autre page ou afficher un message de succès
        },
        error => {
          console.log('Une erreur s\'est produite lors de l\'ajout du produit:', error);
          // Gérer l'erreur ici, par exemple afficher un message d'erreur à l'utilisateur
        }
      );
      
  }


  onFileSelected(event: any): void {
    const inputElement: HTMLInputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.imageFile = inputElement.files[0];
    }
  }


  onImageSelected(event: any) {
    this.imageFile = event.target.files[0];
    const formData = new FormData();
    formData.append('file', this.imageFile);

    this.httpClient.post('api/upload', formData).subscribe((response) => {
      console.log('Image uploaded successfully!', response);
    });
  }


  public onFileChanged(event:any) {
    //Select File
    this.selectedFile = event.target.files[0];
  }


  onUpload(product: User) {
    console.log(this.selectedFile);
    
    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    uploadImageData.append('product', JSON.stringify(product));
  
    //Make a call to the Spring Boot Application to save the image
    this.httpClient.post('http://localhost:8089/PFE/image/upload', uploadImageData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          this.message = 'Image uploaded successfully';
          console.log(this.selectedFile.name);
          
          
          // this.addProduct(product,this.selectedFile.name);
          // console.log("withh image "+product);
          
        } else {
          this.message = 'Image not uploaded successfully';
        }
      }
      );


  }

}
