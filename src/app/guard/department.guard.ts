import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { map, take, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../data/user2.interface';

@Injectable({
  providedIn: 'root'
})
export class DepartmentGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): Observable<boolean> {
    return this.authService.login2('admin@gmail.com', '123456789');
  }
}
