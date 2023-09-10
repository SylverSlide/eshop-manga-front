import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cart } from '../models/cart.model';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItemCountSubject = new BehaviorSubject<number>(0);
  private showPopupSubject = new BehaviorSubject<boolean>(false);
  private apiUrl = `${environment.apiUrl}/carts`;
  cartItemsSubject = new BehaviorSubject<
    { product: Product; quantity: number }[]
  >([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  cartItemCount = this.cartItemCountSubject.asObservable();

  constructor(private http: HttpClient) {}

  addItemToCart(product: Product) {
    const currentItems = this.cartItemsSubject.value;
    const existingItem = currentItems.find(
      (item) => item.product.id === product.id
    );
    if (existingItem) {
      // Si l'article existe déjà, mettez à jour la quantité
      existingItem.quantity++;
    } else {
      // Sinon, ajoutez un nouvel élément au panier
      currentItems.push({ product, quantity: 1 });
    }

    this.cartItemsSubject.next([...currentItems]);
    this.cartItemCountSubject.next(this.cartItemCountSubject.value + 1);
    this.showPopupSubject.next(true);
  }
  removeItemFromCart(productId: number) {
    const currentItems = this.cartItemsSubject.value;
    const updatedItems = currentItems.filter(
      (item) => item.product.id !== productId
    );
    this.cartItemsSubject.next(updatedItems);
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
