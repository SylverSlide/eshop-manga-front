import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = sessionStorage.getItem('token');
    if (token) {
      return true; // L'utilisateur est authentifié, donc autorisé à accéder à la route protégée.
    } else {
      this.router.navigate(['/']);
      return false; // L'utilisateur n'est pas authentifié, donc redirigé vers la page de login.
    }
  }
}
