import {TestBed} from '@angular/core/testing';
import {ProductService} from './product.service';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {environment} from '@env/environment';
import {Product} from '../models/product.model';
import {provideHttpClient} from '@angular/common/http';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  const apiUrl = environment.apiUrl;
  const mockProduct: Product = {
    id: '1',
    name: 'Test product',
    description: 'Test description',
    logo: 'assets/images/logo.png',
    date_release: new Date(),
    date_revision: new Date(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductService, provideHttpClient(), provideHttpClientTesting()]
    });

    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load products', () => {
    const mockResponse = {data: [mockProduct]};

    service.loadProducts().subscribe(products => {
      expect(products.length).toBe(1);
      expect(products).toEqual([mockProduct]);
    });

    const req = httpMock.expectOne(`${apiUrl}/products`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should create a product', () => {
    const mockResponse = {data: mockProduct};

    service.createProduct(mockProduct).subscribe(product => {
      expect(product).toEqual(mockProduct);
    });

    const req = httpMock.expectOne(`${apiUrl}/products`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should update a product', () => {
    const mockResponse = {data: mockProduct};

    service.updateProduct(mockProduct).subscribe(product => {
      expect(product).toEqual(mockProduct);
    });

    const req = httpMock.expectOne(`${apiUrl}/products/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockResponse);
  });

  it('should delete a product', () => {
    service.deleteProduct('1').subscribe(response => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${apiUrl}/products/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should verify product existence', () => {
    service.verifyExistence('1').subscribe(exists => {
      expect(exists).toBeTrue();
    });

    const req = httpMock.expectOne(`${apiUrl}/products/verification/1`);
    expect(req.request.method).toBe('GET');
    req.flush(true);
  });

  it('should handle an error response', () => {
    const errorMessage = 'Test error';

    service.loadProducts().subscribe({
      error: (error) => {
        expect(error.message).toBe(errorMessage);
      }
    });

    const req = httpMock.expectOne(`${apiUrl}/products`);
    req.flush({message: errorMessage}, {status: 500, statusText: 'Server Error'});
  });
});
