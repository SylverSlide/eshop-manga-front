import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  private showAdminHeaderSubject = new BehaviorSubject<boolean>(false);
  showAdminHeader$: Observable<boolean> =
    this.showAdminHeaderSubject.asObservable();

  setShowAdminHeader(value: boolean): void {
    this.showAdminHeaderSubject.next(value);
  }
}
