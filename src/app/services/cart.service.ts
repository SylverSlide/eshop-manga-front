import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemCountSubject = new BehaviorSubject<number>(0);
  private showPopupSubject = new BehaviorSubject<boolean>(false);

  cartItemCount = this.cartItemCountSubject.asObservable();

  constructor() {}

  addItemToCart() {
    this.cartItemCountSubject.next(this.cartItemCountSubject.value + 1);
    this.showPopupSubject.next(true); // Afficher la pop-up
  }

  getCartItemCount(): Observable<number> {
    return this.cartItemCountSubject.asObservable();
  }

  getShowPopup(): Observable<boolean> {
    return this.showPopupSubject.asObservable();
  }
}
