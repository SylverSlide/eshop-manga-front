import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);
  public user: Observable<User | null> = this.userSubject.asObservable();
  constructor() {}

  setUser(user: User | null): void {
    this.userSubject.next(user);
    if (user) {
      sessionStorage.setItem('user', JSON.stringify(user));
    } else {
      sessionStorage.removeItem('user');
    }
  }

  clearUser(): void {
    this.setUser(null);
  }

  getUser(): User | null {
    const userData = sessionStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }

  isLoggedIn(): boolean {
    return sessionStorage.getItem('user') !== null;
  }

  isAdmin(): boolean {
    const user = this.getUser();
    return user !== null && user.role === 'admin';
  }
}
