import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.user$.pipe(
      tap(user => {
        if (!user) {
          this.router.navigate(['/login']); // Redirect to login page if user is not logged in
        }
      }),
      map(user => !!user) // Convert user to boolean value (true if user is logged in, false otherwise)
    );
  }
}
