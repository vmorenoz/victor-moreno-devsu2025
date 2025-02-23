import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ProductsTableComponent} from './products-table.component';
import {ModalService} from '@core/services/modal.service';
import {ProductStoreService} from '../../../data/stores/product-store.service';
import {DialogConfirmModalComponent} from '../dialog-confirm-modal/dialog-confirm-modal.component';
import {EditProductModalComponent} from '../edit-product-modal/edit-product-modal.component';
import {of} from 'rxjs';
import {Product} from '../../../data/models/product.model';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('ProductsTableComponent', () => {
  let component: ProductsTableComponent;
  let fixture: ComponentFixture<ProductsTableComponent>;
  let modalServiceSpy: jasmine.SpyObj<ModalService>;
  let productStoreSpy: jasmine.SpyObj<ProductStoreService>;

  beforeEach(async () => {
    modalServiceSpy = jasmine.createSpyObj('ModalService', ['open']);
    productStoreSpy = jasmine.createSpyObj('ProductStoreService', ['deleteProduct']);

    await TestBed.configureTestingModule({
      imports: [ProductsTableComponent],
      providers: [
        {provide: ModalService, useValue: modalServiceSpy},
        {provide: ProductStoreService, useValue: productStoreSpy},
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open edit modal when handleEdit is called', () => {
    const mockProduct: Product = {
      id: '1',
      name: 'Product Test',
      description: 'Test Description',
      logo: 'test-logo.png',
      date_release: new Date('2024-01-01'),
      date_revision: new Date('2025-01-01')
    };

    component.handleEdit(mockProduct);
    expect(modalServiceSpy.open).toHaveBeenCalledWith(EditProductModalComponent, {product: mockProduct});
  });

  it('should open confirmation modal when handleDelete is called', () => {
    const mockProduct: Product = {
      id: '1',
      name: 'Product Test',
      description: 'Test Description',
      logo: 'test-logo.png',
      date_release: new Date('2024-01-01'),
      date_revision: new Date('2025-01-01')
    };

    const modalRefMock = {afterClosed: () => of(true)};
    modalServiceSpy.open.and.returnValue(modalRefMock as any);

    spyOn(component, 'deleteProduct');

    component.handleDelete(mockProduct);
    expect(modalServiceSpy.open).toHaveBeenCalledWith(DialogConfirmModalComponent, {
      titleText: 'Confirmar eliminación',
      message: `¿Estás seguro de que quieres eliminar el producto ${mockProduct.name}?`,
    });

    fixture.detectChanges();
    expect(component.deleteProduct).toHaveBeenCalledWith(mockProduct);
  });

  it('should call deleteProduct from productStore when deleteProduct is called', () => {
    const mockProduct: Product = {
      id: '1',
      name: 'Product Test',
      description: 'Test Description',
      logo: 'test-logo.png',
      date_release: new Date('2024-01-01'),
      date_revision: new Date('2025-01-01')
    };

    const mockResponse = {message: 'Producto eliminado correctamente'};
    productStoreSpy.deleteProduct.and.returnValue(of(mockResponse));

    component['deleteProduct'](mockProduct);
    expect(productStoreSpy.deleteProduct).toHaveBeenCalledWith(mockProduct.id);
    expect(modalServiceSpy.open).toHaveBeenCalledWith(DialogConfirmModalComponent, {
      titleText: 'Producto eliminado',
      message: mockResponse.message,
      showCancel: false,
      showConfirm: true,
      confirmText: 'Aceptar',
    });
  });
});
