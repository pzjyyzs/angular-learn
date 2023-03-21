import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Item, Product } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class StockInventoryService {

  constructor(
    private http: HttpClient
  ) { }

  getCartItems(): Observable<Item[]> {
    return this.http.get<Item[]>('/api/cart')
      .pipe(
        map((res: Item[]) => res),
        catchError(this.handleError)
      )
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('/api/products')
      .pipe(
        map((product: Product[]) => product),
        catchError(this.handleError)
      )
  }

  checkBranchId(id: string): Observable<boolean> {
    let params = new HttpParams();
    params.set('id', id);
    return this.http.get('/api/branches', { params })
      .pipe(
        map((res: any) => res),
        catchError(this.handleError)
      )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // client side error
      console.warn('Client', error.message);
    } else {
      // server side error
      console.warn('Server', error.status);
    }
    return throwError(() => new Error(error.message));
  }
}
