import { Component, OnInit } from '@angular/core';
import { Reunion } from '../Models/Reunion';
import { ReunionServiceService } from '../reunion-service.service';
import { User } from '../Models/user';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-proposer-reunion',
  templateUrl: './proposer-reunion.component.html',
  styleUrls: ['./proposer-reunion.component.css']
})
export class ProposerReunionComponent implements OnInit  {
  reunion: Reunion = new Reunion();
  userConnected: User | null = null;
 
  idStagiaire: number = 4;
 
  constructor(private reunionService: ReunionServiceService,private authService: AuthServiceService) {}
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

  ajouterReunion(): void {
    if (!this.userConnected) {
      console.error('No user connected');
      return;
    }

    this.reunionService.proposerReunion(this.reunion, this.userConnected.id).subscribe(
      response => {
        console.log('Reunion proposed successfully:', response);
        window.alert('Reunion proposed successfully');
      },
      error => {
        console.error('Error adding reunion:', error);
      }
    );
   window.location.reload();
  }

  // ajouterReunion(): void {
  //   this.reunionService.proposerReunion(this.reunion, this.idStagiaire).subscribe(
  //     response => {
  //       console.log('Reunion proposed successfully:', response);
  //     window.alert('Reunion propsed successfully') ;
       
  //     },
  //     error => {
  //       console.error('Error adding reunion:', error);
  //     }
  //   );
  //  // window.location.reload();
  // }


}
