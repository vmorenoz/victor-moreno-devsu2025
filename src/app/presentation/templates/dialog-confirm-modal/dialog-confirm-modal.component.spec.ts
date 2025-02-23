import {ComponentFixture, TestBed} from '@angular/core/testing';
import {DialogConfirmModalComponent} from './dialog-confirm-modal.component';
import {ModalRef} from '@core/classes/modal-ref';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('DialogConfirmModalComponent', () => {
  let component: DialogConfirmModalComponent;
  let fixture: ComponentFixture<DialogConfirmModalComponent>;
  let modalRefSpy: jasmine.SpyObj<ModalRef<any>>;

  beforeEach(async () => {
    modalRefSpy = jasmine.createSpyObj('ModalRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [DialogConfirmModalComponent],
      providers: [{provide: ModalRef, useValue: modalRefSpy}],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DialogConfirmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close modal with "true" on confirm', () => {
    component.handleConfirm(true);
    expect(modalRefSpy.close).toHaveBeenCalledWith(true);
  });

  it('should close modal with "false" on cancel', () => {
    component.handleClose();
    expect(modalRefSpy.close).toHaveBeenCalledWith(false);
  });

  it('should have default values for inputs', () => {
    expect(component.titleText()).toBe('Confirmar acción');
    expect(component.message()).toBe('¿Estás seguro de que quieres realizar esta acción?');
    expect(component.showCancel()).toBeTrue();
    expect(component.showConfirm()).toBeTrue();
    expect(component.confirmText()).toBe('Confirmar');
    expect(component.cancelText()).toBe('Cancelar');
  });
});
