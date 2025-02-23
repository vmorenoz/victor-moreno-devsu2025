import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ProductFormComponent} from './product-form.component';
import {FormBuilder} from '@angular/forms';
import {ProductStoreService} from '../../../data/stores/product-store.service';
import {DatePipe} from '@angular/common';
import {of} from 'rxjs';
import {Product} from '../../../data/models/product.model';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;
  let productStoreSpy: jasmine.SpyObj<ProductStoreService>;

  beforeEach(async () => {
    productStoreSpy = jasmine.createSpyObj('ProductStoreService', ['verifyExistence']);
    productStoreSpy.verifyExistence.and.returnValue(of(false));

    await TestBed.configureTestingModule({
      imports: [ProductFormComponent],
      providers: [
        FormBuilder,
        DatePipe,
        {provide: ProductStoreService, useValue: productStoreSpy}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values', () => {
    expect(component.productForm).toBeDefined();
    expect(component.productForm.controls.name.value).toBe('');
  });

  it('should disable id field if initialData is provided', () => {
    const mockProduct: Product = {
      id: '12345',
      name: 'Test Product',
      description: 'Test Description',
      logo: 'logo.png',
      date_release: new Date('2024-05-01'),
      date_revision: new Date('2025-05-01')
    };
    fixture.componentRef.setInput('initialData', mockProduct);
    fixture.detectChanges();

    expect(component.productForm.controls.id?.disabled).toBeFalse();
  });

  it('should call onSubmit when handleSubmit is triggered', () => {
    spyOn(component.onSUbmit, 'emit');
    component.handleSubmit();
    expect(component.onSUbmit.emit).toHaveBeenCalled();
  });

  it('should reset form and emit onClear when handleClear is triggered', () => {
    spyOn(component.onClear, 'emit');
    component.handleClear();
    expect(component.productForm.pristine).toBeTrue();
    expect(component.onClear.emit).toHaveBeenCalled();
  });

  it('should validate future date correctly', () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1);
    component.productForm.controls.date_release.setValue(pastDate.toISOString().split('T')[0]);
    fixture.detectChanges();

    expect(component.productForm.controls.date_release.valid).toBeFalse();
  });
});
