import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '@env/environment';
import {catchError, map, Observable, throwError} from 'rxjs';
import {Product} from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  readonly httpClient = inject(HttpClient);
  readonly apiUrl = environment.apiUrl;

  loadProducts(): Observable<Product[]> {
    return this.httpClient.get<{ data: Product[] }>(`${this.apiUrl}/products`)
      .pipe(
        map(response => response.data),
        catchError(this.handleError)
      );
  }

  createProduct(product: Product): Observable<Product> {
    return this.httpClient.post<{ data: Product }>(`${this.apiUrl}/products`, product)
      .pipe(
        map(response => response.data),
        catchError(this.handleError)
      );
  }

  updateProduct(product: Product): Observable<Product> {
    return this.httpClient.put<{ data: Product }>(`${this.apiUrl}/products/${product.id}`, product)
      .pipe(
        map(response => response.data),
        catchError(this.handleError)
      );
  }

  deleteProduct(id: string): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/products/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  verifyExistence(id: string): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.apiUrl}/products/verification/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(() => new Error(error.message || 'Ocurrió un error inesperado'));
  }
}
