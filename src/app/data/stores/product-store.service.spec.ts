import {TestBed} from '@angular/core/testing';

import {ProductStoreService} from './product-store.service';
import {ProductService} from '@services/product.service';
import {Product} from '../models/product.model';
import {of} from 'rxjs';

describe('ProductStoreService', () => {
  let service: ProductStoreService;
  let productServiceSpy: jasmine.SpyObj<ProductService>;

  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Product 1',
      description: 'Description 1',
      logo: 'logo1.png',
      date_release: new Date('2024-01-01'),
      date_revision: new Date('2025-01-01')
    },
    {
      id: '2',
      name: 'Product 2',
      description: 'Description 2',
      logo: 'logo2.png',
      date_release: new Date('2024-02-01'),
      date_revision: new Date('2025-02-01')
    }
  ];

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ProductService', [
      'loadProducts', 'createProduct', 'updateProduct', 'deleteProduct', 'verifyExistence'
    ]);

    TestBed.configureTestingModule({
      providers: [
        ProductStoreService,
        {provide: ProductService, useValue: spy}
      ]
    });

    productServiceSpy = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;

    // Simular respuesta del servicio antes de inyectar ProductStoreService
    productServiceSpy.loadProducts.and.returnValue(of(mockProducts));

    service = TestBed.inject(ProductStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load products on initialization', () => {
    expect(service.allProducts()).toEqual(mockProducts);
  });

  it('should add a product', () => {
    const newProduct: Product = {
      id: '3',
      name: 'Product 3',
      description: 'Description 3',
      logo: 'logo3.png',
      date_release: new Date('2024-03-01'),
      date_revision: new Date('2025-03-01')
    };

    productServiceSpy.createProduct.and.returnValue(of(newProduct));
    service.addProduct(newProduct).subscribe();
    expect(service.allProducts()).toContain(newProduct);
  });

  it('should update a product', () => {
    const updatedProduct: Product = {...mockProducts[0], name: 'Updated Product 1'};
    productServiceSpy.updateProduct.and.returnValue(of(updatedProduct));
    service.updateProduct(updatedProduct).subscribe();
    expect(service.allProducts().find(p => p.id === updatedProduct.id)?.name).toBe('Updated Product 1');
  });

  it('should delete a product', () => {
    const productId = '1';
    productServiceSpy.deleteProduct.and.returnValue(of({}));
    service.deleteProduct(productId).subscribe();
    expect(service.allProducts().some(p => p.id === productId)).toBeFalse();
  });

  it('should verify product existence', () => {
    productServiceSpy.verifyExistence.and.returnValue(of(true));
    service.verifyExistence('1').subscribe(exists => {
      expect(exists).toBeTrue();
    });
  });
});
