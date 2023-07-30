import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cart } from '../models/cart.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemCountSubject = new BehaviorSubject<number>(0);
  private showPopupSubject = new BehaviorSubject<boolean>(false);
  private apiUrl = `${environment.apiUrl}/carts`;

  cartItemCount = this.cartItemCountSubject.asObservable();

  constructor(private http: HttpClient) {}

  addItemToCart() {
    this.cartItemCountSubject.next(this.cartItemCountSubject.value + 1);
    this.showPopupSubject.next(true);
  }

  getCartItemCount(): Observable<number> {
    return this.cartItemCountSubject.asObservable();
  }

  getShowPopup(): Observable<boolean> {
    return this.showPopupSubject.asObservable();
  }

  getCarts(): Observable<Cart[]> {
    return this.http.get<Cart[]>(this.apiUrl);
  }

  getCart(id: number): Observable<Cart> {
    return this.http.get<Cart>(`${this.apiUrl}/${id}`);
  }

  createCart(cart: Cart): Observable<Cart> {
    return this.http.post<Cart>(this.apiUrl, cart);
  }

  updateCart(id: number, cart: Cart): Observable<Cart> {
    return this.http.put<Cart>(`${this.apiUrl}/${id}`, cart);
  }

  deleteCart(id: number): Observable<Cart> {
    return this.http.delete<Cart>(`${this.apiUrl}/${id}`);
  }
}
