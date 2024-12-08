import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthServiceService } from "./auth-service.service";
import { Observable, catchError, map, of } from "rxjs";
import { Injectable } from "@angular/core";
import { ROLE } from "./Models/user";
@Injectable({
    providedIn: 'root'
  })
export class RoleGuard implements CanActivate {

    constructor(private authService: AuthServiceService, private router: Router) {}
  
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
      ): Observable<boolean> | Promise<boolean> | boolean {
        const expectedRoles: ROLE[] = next.data["expectedRoles"];
    
        return this.authService.getUserDetails().pipe(
          map(userDetails => {
            if (userDetails && expectedRoles.includes(userDetails.role)) {
              return true;
            } else {
              this.router.navigate(['/login']); // or another page if preferred
              return false;
            }
          }),
          catchError(error => {
            console.error("Error in RoleGuard:", error);
            this.router.navigate(['/login']);
            return of(false);
          })
        );
      }
  }