import { Component, OnInit } from '@angular/core';
import { FileServiceService } from '../file-service.service';
import { User } from '../Models/user';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-uploadfile',
  templateUrl: './uploadfile.component.html',
  styleUrls: ['./uploadfile.component.css']
})
export class UploadfileComponent implements OnInit {
  selectedFileName: string = '';

  userConnected: User | null = null;

  constructor(private fileUploadService: FileServiceService,private authService: AuthServiceService) { }
  ngOnInit(): void {
    this.authService.getUserDetails().subscribe(
      userDetails => {
        this.userConnected = userDetails;
      },
      error => {
        console.error('Error fetching user details:', error);
      }
    );
   
  }

  // onFileSelected(event: any): void {
  //   const file: File = event.target.files[0];
  //   this.selectedFileName = file.name; // Mettre à jour le nom du fichier sélectionné
  //   this.fileUploadService.uploadFile(file).subscribe(response => {
  //     console.log('Fichier uploadé avec succès !');
      
  //   });
  //   const confirmed = window.confirm("le fichier est depose ");
  //   if (confirmed) {
  //     window.location.reload();
  // }
  // }
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    this.selectedFileName = file.name; // Mettre à jour le nom du fichier sélectionné
    
    if (this.userConnected) {
      this.fileUploadService.uploadFilee(file, this.userConnected.id).subscribe(
        response => {
          console.log('Fichier uploadé avec succès !');
          const confirmed = window.confirm("Le fichier est déposé.");
          if (confirmed) {
            window.location.reload();
          }
        },
        error => {
          window.location.reload();
        }
      );
    } else {
      console.error('Utilisateur non connecté');
      alert('Utilisateur non connecté');
    }
  }
}
