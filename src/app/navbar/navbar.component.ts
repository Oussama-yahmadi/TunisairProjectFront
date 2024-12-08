import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';
import { User } from '../Models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userConnected: User | null = null;
  constructor(private authService: AuthServiceService, private router: Router) {}
 

  logout(): void {
    this.authService.logout();
    console.log("deconnected");
    
  }

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
  }


