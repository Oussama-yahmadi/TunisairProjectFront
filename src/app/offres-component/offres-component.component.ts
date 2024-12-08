import { Component, OnInit } from '@angular/core';
import { StageOffer } from '../Models/StageOffer';
import { OffreServiceService } from '../offre-service.service';

@Component({
  selector: 'app-offres-component',
  templateUrl: './offres-component.component.html',
  styleUrls: ['./offres-component.component.css']
})
export class OffresComponentComponent implements OnInit {
  offres: StageOffer[] = [];

  constructor(private offreService:OffreServiceService) {}
  ngOnInit(): void {
    this.getTests();
  }


  getTests(): void {
    this.offreService.getAllOffers()
      .subscribe(
        demandes => {
          this.offres = demandes;
          console.log('Demandes récupérées avec succès :', demandes);
          
          
        },
        error => {
          console.error('Erreur lors de la récupération des demandes :', error);
        }
      );
  }

}
