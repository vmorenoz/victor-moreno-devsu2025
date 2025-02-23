import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ProductsComponent} from './products.component';
import {ModalService} from '@core/services/modal.service';
import {ProductStoreService} from '../../../data/stores/product-store.service';
import {CreateProductModalComponent} from '../../templates/create-product-modal/create-product-modal.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NO_ERRORS_SCHEMA, signal} from '@angular/core';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let modalServiceSpy: jasmine.SpyObj<ModalService>;
  let productStoreSpy: jasmine.SpyObj<ProductStoreService>;

  beforeEach(async () => {
    modalServiceSpy = jasmine.createSpyObj('ModalService', ['open']);
    productStoreSpy = jasmine.createSpyObj('ProductStoreService', ['searchWords', 'currentPage', 'pageSize', 'isLoading', 'products', 'allProducts'], {
      searchWords: {set: jasmine.createSpy('set')},
      currentPage: {set: jasmine.createSpy('set')},
      pageSize: {set: jasmine.createSpy('set')},
      allProducts: signal([]),
    });

    await TestBed.configureTestingModule({
      imports: [ProductsComponent, ReactiveFormsModule],
      providers: [
        {provide: ModalService, useValue: modalServiceSpy},
        {provide: ProductStoreService, useValue: productStoreSpy},
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open create product modal when createProduct is called', () => {
    component.createProduct();
    expect(modalServiceSpy.open).toHaveBeenCalledWith(CreateProductModalComponent);
  });

  it('should update searchWords in productStore when handleSearch is called', () => {
    const searchTerm = 'test';
    component.handleSearch(searchTerm);
    expect(productStoreSpy.searchWords.set).toHaveBeenCalledWith(searchTerm);
  });

  it('should set empty string in searchWords when handleSearch is called with null', () => {
    component.handleSearch(null);
    expect(productStoreSpy.searchWords.set).toHaveBeenCalledWith('');
  });

  it('should update currentPage and pageSize when handlePageChange is called', () => {
    const pageData = {page: 2, size: 10};
    component.handlePageChange(pageData);
    expect(productStoreSpy.currentPage.set).toHaveBeenCalledWith(pageData.page);
    expect(productStoreSpy.pageSize.set).toHaveBeenCalledWith(pageData.size);
  });
});
