import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';
import { User } from '../Models/user';

@Component({
  selector: 'app-navbar-stagiaire',
  templateUrl: './navbar-stagiaire.component.html',
  styleUrls: ['./navbar-stagiaire.component.css']
})
export class NavbarStagiaireComponent implements OnInit {
  userConnected: User | null = null;

  constructor(private authService: AuthServiceService, private router: Router) {}
  ngOnInit(): void {
    this.authService.getUserDetails().subscribe(
      (userDetails: User | null) => {
        this.userConnected = userDetails;
       // console.log("User ID:", this.userConnected.id);
        console.log("User Details:", JSON.stringify(this.userConnected));
        
      },
      error => {
        console.error("Error fetching user details:", error);
      }
    );
  }

  logout(): void {
    this.authService.logout();
    console.log("deconnected");
    
  }

}
