import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';
import { User } from '../models/user.model';
import { LoginResponse } from '../models/login-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}`;
  private currentUserSubject: BehaviorSubject<User | null>;

  constructor(private http: HttpClient, private userService: UserService) {
    const storedUser = sessionStorage.getItem('user');
    this.currentUserSubject = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
  }

  get currentUserValue(): User | null {
    return this.currentUserSubject.getValue();
  }

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, body).pipe(
      tap((response) => {
        this.currentUserSubject.next(response.user);
        sessionStorage.setItem('user', JSON.stringify(response.user));
      })
    );
  }

  verifyEmail(token: string): Observable<any> {
    const url = `${this.apiUrl}/email/verify/${token}`;
    return this.http.get(url);
  }

  // Méthode pour déconnecter l'utilisateur
  logout(): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/logout`, {})
      .pipe(tap(() => this.clearToken()));
  }

  // Méthode pour effacer le token de l'utilisateur
  private clearToken(): void {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  getUserDetails(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user`);
  }
}
