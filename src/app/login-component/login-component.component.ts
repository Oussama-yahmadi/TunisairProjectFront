import { Component } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';
import { JwtRequest } from '../Models/JwtRequest';
import { JwtResponse } from '../Models/JwtResponse';
import { ROLE, User } from '../Models/user';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent {

  email: string ='' ;
  password: string ='' ;
  errorMessage: string = '';

  constructor(private authService: AuthServiceService, private router: Router) {}

//   login(): void {
//     const credentials: JwtRequest = {
//       username: this.email,
//       password: this.password
//     };

//     this.authService.login(credentials).subscribe(
//       (response: JwtResponse) => {
//         // Enregistrez le jeton JWT dans le localStorage
//         localStorage.setItem('token', response.token);
// console.log("succes"+response.token+"email"+this.email+"password"+this.password);

//         // Redirigez l'utilisateur vers la page d'accueil ou une autre page appropriée
//       //  this.router.navigate(['/']);
//       },
//       error => {
//         // Gérer les erreurs d'authentification
//         this.errorMessage = 'Identifiants incorrects. Veuillez réessayer.';
//       }
//     );
//   }



// login(): void {
//   const credentials: JwtRequest = {
//     username: this.email,
//     password: this.password
//   };

//   this.authService.login(credentials).subscribe(
//     (response: JwtResponse) => {
//       // Enregistrez le jeton JWT dans le localStorage
//       localStorage.setItem('token', response.token);
//       console.log("succes"+response.token+"email"+this.email+"password"+this.password);
//       // Obtenez les détails de l'utilisateur à partir du token décodé
//       const userDetails = this.authService.getUserDetails();
//       // Redirigez l'utilisateur en fonction de son rôle
//       if (userDetails && userDetails.roles.includes('ADMIN')) {
//         console.log("user"+userDetails);
        
//       //  this.router.navigate(['/navbar']);
//       } else {
//         console.log("user"+userDetails);
        
//        // this.router.navigate(['/user']);
//       }
//     },
//     error => {
//       // Gérer les erreurs d'authentification
//       this.errorMessage = 'Identifiants incorrects. Veuillez réessayer.';
//     }
//   );
// }



// login(): void {
//   const credentials: JwtRequest = {
//     username: this.email,
//     password: this.password
//   };

//   this.authService.login(credentials).subscribe(
//     (response: JwtResponse) => {
//       // Enregistrez le jeton JWT dans le localStorage
//       localStorage.setItem('token', response.token);
//       console.log("succes"+response.token+"email"+this.email+"password"+this.password);
//       // Obtenez les détails de l'utilisateur à partir du token décodé
//       const userDetails = this.authService.getUserDetails();
//       console.log("User Details JSON:", JSON.stringify(userDetails));
//       console.log("token"+localStorage.getItem('token'));
      
      
//       if (userDetails) {
//         // Redirigez l'utilisateur en fonction de son rôle
//         switch (userDetails.) {
//           case ROLE.ADMIN:
//             this.router.navigate(['/navbar']);
//             break;
//           case ROLE.TUTEUR:
//             this.router.navigate(['/tuteur']);
//             break;
//           case ROLE.STAGIAIRE:
//             this.router.navigate(['/stagiaire']);
//             break;
//           case ROLE.TESTEUR:
//             this.router.navigate(['/testeur']);
//             break;
//           case ROLE.CONDIDAT:
//             this.router.navigate(['/condidat']);
//             break;
//           default:
//             this.router.navigate(['/user']);
//         }
//       }
//     },
//     error => {
//       // Gérer les erreurs d'authentification
//       this.errorMessage = 'Identifiants incorrects. Veuillez réessayer.';
//     }
//   );
// }

login(): void {
  const credentials: JwtRequest = {
    username: this.email,
    password: this.password
  };

  this.authService.login(credentials).subscribe(
    (response: JwtResponse) => {
      // Enregistrez le jeton JWT dans le localStorage
      localStorage.setItem('token', response.token);
      console.log("succes"+response.token+"email"+this.email+"password"+this.password);
      
      // Obtenez les détails de l'utilisateur à partir du token décodé
      this.authService.getUserDetails().subscribe(
        (userDetails: User | null) => {
          if (userDetails) {
            console.log("User Details:", userDetails);
            
            // Redirigez l'utilisateur en fonction de son rôle
            switch (userDetails.role) {
              case ROLE.ADMIN:
                this.router.navigate(['/navbar']);
                break;
              case ROLE.TUTEUR:
                this.router.navigate(['/navbarTuteur']);
                break;
              case ROLE.STAGIAIRE:
                this.router.navigate(['/navbarStagiaire']);
                break;
              case ROLE.TESTEUR:
                this.router.navigate(['/quizz']);
                break;
              case ROLE.CONDIDAT:
                this.router.navigate(['/condidat']);
                break;
              default:
                this.router.navigate(['/user']);
            }
          } else {
            console.error("User details not found.");
            // Rediriger vers une page par défaut si les détails de l'utilisateur ne sont pas disponibles
            this.router.navigate(['/default']);
          }
        },
        error => {
          console.error("Error fetching user details:", error);
          // Rediriger vers une page par défaut en cas d'erreur de récupération des détails de l'utilisateur
          this.router.navigate(['/default']);
        }
      );
    },
    error => {
      // Gérer les erreurs d'authentification
      this.errorMessage = 'Identifiants incorrects. Veuillez réessayer.';
    }
  );
}
}
