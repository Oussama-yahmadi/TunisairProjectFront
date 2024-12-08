import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators'; // Ajoutez cette importation
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { JwtRequest } from './Models/JwtRequest';
import { JwtResponse } from './Models/JwtResponse';
import { ROLE, User } from './Models/user';
//import { JwtHelperService } from '@auth0/angular-jwt';








@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private apiUrl = 'http://localhost:8089/PFE/authenticate';

  constructor(private http: HttpClient , // private jwtHelper: JwtHelperService,
    private router: Router) {}
 

    login(credentials: JwtRequest): Observable<JwtResponse> {
      return this.http.post<JwtResponse>(this.apiUrl, credentials).pipe(
        tap(response => {
          // Stocker le jeton JWT dans le localStorage après une connexion réussie
          localStorage.setItem('token', response.token);
          this.getUserDetails().subscribe(userDetails => {
            if (userDetails) {
              localStorage.setItem('user', JSON.stringify(userDetails));
             console.log("user connected "+userDetails);
             
              
            }
          });
        })
      );
    }



    logout(): void {
      // Supprimer le jeton JWT du localStorage lors de la déconnexion
      localStorage.removeItem('token');
      localStorage.clear();  // This will remove all items from localStorage
      this.router.navigate(['/login']); 
    }
  
    isLoggedIn(): boolean {
      // Vérifier si le jeton JWT est présent dans le localStorage
      return !!localStorage.getItem('token');
    }
  
    getToken(): string | null {
      return localStorage.getItem('token');
    }
  
    // decodeToken(token: string): any {
    //   if (!token) {
    //     return null;
    //   }
    //   const base64Url = token.split('.')[1];
    //   const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    //   const jsonPayload = decodeURIComponent(
    //     atob(base64)
    //       .split('')
    //       .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
    //       .join('')
    //   );
    //   return JSON.parse(jsonPayload);
    // }
  
    // getUserDetails(): User | null {
    //   const token = this.getToken();
    //   if (token) {
    //     const decodedToken = this.decodeToken(token);
    //     console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzzzzz"+decodedToken);
        
    //     // Mapper les rôles du token à l'enum ROLE
    //     const user: User = {
    //       id: decodedToken.id,
    //       nom: decodedToken.nom,
    //       prenom: decodedToken.prenom,
    //       email: decodedToken.email,
    //       cin: decodedToken.cin,
    //       telephone: decodedToken.telephone,
    //       score: decodedToken.score,
    //       faculte: decodedToken.faculte,
    //       niveau: decodedToken.niveau,
    //       role: decodedToken.role as ROLE,
    //       quizPassed: decodedToken.quizPassed,
    //       retriev: decodedToken.retriev,
    //       imageName: decodedToken.imageName
    //     };
    //     return user;
    //   }
    //   return null;
    // }



    // last one
  //   decodeToken(token: string): User | null {
  //     if (!token) {
  //       return null;
  //     }
  //     const base64Url = token.split('.')[1];
  //     const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  //     const jsonPayload = decodeURIComponent(
  //       atob(base64)
  //         .split('')
  //         .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
  //         .join('')
  //     );
  //     const decodedToken = JSON.parse(jsonPayload);
  // console.log("wwwwwwww"+decodedToken);
  // console.log("emaa"+decodedToken.sub);
  
  
  //     // Assurez-vous que les propriétés de decodedToken correspondent à celles attendues dans User
  //     const user: User = {
  //       id: decodedToken.id,
  //       nom: decodedToken.nom,
  //       prenom: decodedToken.prenom,
  //       email: decodedToken.email,
  //       cin: decodedToken.cin,
  //       telephone: decodedToken.telephone,
  //       score: decodedToken.score,
  //       faculte: decodedToken.faculte,
  //       niveau: decodedToken.niveau,
  //       role: decodedToken.role as ROLE,
  //       quizPassed: decodedToken.quizPassed,
  //       retriev: decodedToken.retriev,
  //       imageName: decodedToken.imageName
  //     };
  //     console.log("zzzzzzzzzzzzzzzzzzzzz"+user);
      
      
  //     return user;
  //   }
  
  //   getUserDetails(): User | null {
  //     const token = this.getToken();
  //     if (token) {
  //       const user = this.decodeToken(token);
  //       console.log("User Details:", user);
  //       return user;
  //     }
  //     return null;
  //   }


  decodeToken(token: string): string | null {
    if (!token) {
      return null;
    }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    const decodedToken = JSON.parse(jsonPayload);
    console.log("Decoded Token:", decodedToken);
    return decodedToken.sub; // Assuming 'sub' contains the email
  }

  // getUserByEmail(email: string): Observable<User> {
  //   const url = `http://localhost:8089/PFE/User/userbymail/${email}`;
  //   console.log(url);
  //    // Assurez-vous que ce endpoint existe
  //   return this.http.get<User>(url);
  // }

  getUserByEmail(email: string): Observable<User | null> {
    const url = `http://localhost:8089/PFE/User/userbymail/${email}`;
    return this.http.post<User>(url, {});
  }

  
  getUserDetails(): Observable<User | null> {
    const token = this.getToken();
    if (!token) {
      return of(null);
    }
    const email = this.decodeToken(token);
    if (!email) {
      return of(null);
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.getUserByEmail(email).pipe(
      tap(user => {
        console.log("User Details:", user);
      }),
      catchError(error => {
        console.error("Error fetching user details:", error);
        return of(null);
      })
    );
  }
}
