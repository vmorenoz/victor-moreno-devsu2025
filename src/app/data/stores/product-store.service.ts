import {computed, inject, Injectable, signal} from '@angular/core';
import {ProductService} from '@services/product.service';
import {Product} from '../models/product.model';
import {tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductStoreService {

  private readonly productService = inject(ProductService);

  readonly allProducts = signal<Product[]>([]);
  readonly pageSize = signal(5);
  readonly searchWords = signal<string>('');
  readonly currentPage = signal(0);
  readonly isLoading = signal(true);

  readonly products = computed<Product[]>(() => {
    const pageStart = this.currentPage() * this.pageSize();
    const pageEnd = pageStart + this.pageSize();
    return this.allProducts().
      filter(product => product.name.toLowerCase().includes(this.searchWords().toLowerCase())).
      slice(pageStart, pageEnd);
  });

  constructor() {
    this.productService
      .loadProducts()
      .subscribe(products => {
        this.allProducts.set(products);
        setTimeout(() => this.isLoading.set(false), 1000);
      });
  }

  addProduct(product: Product) {
    return this.productService
      .createProduct(product)
      .pipe(
        tap(product => this.allProducts.update(products => [...products, product])),
      )
  }

  updateProduct(product: Product) {
    return this.productService
      .updateProduct(product)
      .pipe(
        tap(product => this.allProducts.update(products => products.map(p => p.id === product.id ? product : p))),
      );
  }

  deleteProduct(id: string) {
    return this.productService
      .deleteProduct(id)
      .pipe(
        tap(response => this.allProducts.update(products => products.filter(p => p.id !== id))),
      );
  }

  verifyExistence(id: string) {
    return this.productService.verifyExistence(id);
  }
}
