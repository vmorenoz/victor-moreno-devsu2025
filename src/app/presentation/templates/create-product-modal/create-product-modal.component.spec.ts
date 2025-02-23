import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CreateProductModalComponent} from './create-product-modal.component';
import {ProductStoreService} from '../../../data/stores/product-store.service';
import {ModalRef} from '@core/classes/modal-ref';
import {of, throwError} from 'rxjs';
import {Product} from '../../../data/models/product.model';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('CreateProductModalComponent', () => {
  let component: CreateProductModalComponent;
  let fixture: ComponentFixture<CreateProductModalComponent>;
  let modalRefSpy: jasmine.SpyObj<ModalRef<any>>;
  let productStoreSpy: jasmine.SpyObj<ProductStoreService>;

  beforeEach(async () => {
    modalRefSpy = jasmine.createSpyObj('ModalRef', ['close']);
    productStoreSpy = jasmine.createSpyObj('ProductStoreService', ['addProduct']);

    await TestBed.configureTestingModule({
      imports: [CreateProductModalComponent],
      providers: [
        {provide: ModalRef, useValue: modalRefSpy},
        {provide: ProductStoreService, useValue: productStoreSpy},
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateProductModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close modal on handleClose', () => {
    component.handleClose();
    expect(modalRefSpy.close).toHaveBeenCalled();
  });

  it('should call addProduct and close modal on successful submission', () => {
    const mockProduct: Product = {
      id: '1',
      name: 'Product Test',
      description: 'Test Description',
      logo: 'test-logo.png',
      date_release: new Date('2024-01-01'),
      date_revision: new Date('2025-01-01')
    };

    productStoreSpy.addProduct.and.returnValue(of(mockProduct));
    component.handleSubmit(mockProduct);
    expect(productStoreSpy.addProduct).toHaveBeenCalledWith(mockProduct);
    expect(modalRefSpy.close).toHaveBeenCalledWith(mockProduct);
  });

  it('should set errorMessage on submission failure', () => {
    const errorResponse = new Error('Submission failed');
    productStoreSpy.addProduct.and.returnValue(throwError(() => errorResponse));

    component.handleSubmit({} as Product);
    expect(component.errorMessage()).toBe('Submission failed');
  });
});
