import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrderProduct } from '../models/order-product.model';

@Injectable({
  providedIn: 'root',
})
export class OrderProductService {
  private apiUrl = `${environment.apiUrl}/order-products`;

  constructor(private http: HttpClient) {}

  getOrderProducts(): Observable<OrderProduct[]> {
    return this.http.get<OrderProduct[]>(this.apiUrl);
  }

  getOrderProduct(id: number): Observable<OrderProduct> {
    return this.http.get<OrderProduct>(`${this.apiUrl}/${id}`);
  }

  createOrderProduct(orderProduct: OrderProduct): Observable<OrderProduct> {
    return this.http.post<OrderProduct>(this.apiUrl, orderProduct);
  }

  updateOrderProduct(
    id: number,
    orderProduct: OrderProduct
  ): Observable<OrderProduct> {
    return this.http.put<OrderProduct>(`${this.apiUrl}/${id}`, orderProduct);
  }

  deleteOrderProduct(id: number): Observable<OrderProduct> {
    return this.http.delete<OrderProduct>(`${this.apiUrl}/${id}`);
  }
}
