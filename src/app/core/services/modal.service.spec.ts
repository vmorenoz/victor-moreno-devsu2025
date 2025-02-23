import {TestBed} from '@angular/core/testing';

import {ModalService} from './modal.service';
import {Component, Injector, ViewContainerRef} from '@angular/core';
import {ModalRef} from '@core/classes/modal-ref';

describe('ModalService', () => {
  let service: ModalService;
  let mockViewContainerRef: jasmine.SpyObj<ViewContainerRef>;

  @Component({template: '<p>Mock Component</p>'})
  class MockComponent {
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModalService]
    });

    service = TestBed.inject(ModalService);

    mockViewContainerRef = jasmine.createSpyObj<ViewContainerRef>('ViewContainerRef', ['createComponent']);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set ViewContainerRef', () => {
    service.setViewContainerRef(mockViewContainerRef);
    expect(service['viewContainerRef']).toBe(mockViewContainerRef);
  });

  it('should not set ViewContainerRef if undefined is passed', () => {
    service.setViewContainerRef(undefined);
    expect(service['viewContainerRef']).toBeNull();
  });

  it('should throw an error if open() is called without setting ViewContainerRef', () => {
    expect(() => service.open(MockComponent)).toThrowError(
      'No ViewContainerRef set! Asegúrate de llamarlo en el módulo o componente principal.'
    );
  });

  it('should create a component and return a ModalRef', () => {
    const mockComponentRef = jasmine.createSpyObj('ComponentRef', ['setInput', 'destroy']);
    mockViewContainerRef.createComponent.and.returnValue(mockComponentRef);

    service.setViewContainerRef(mockViewContainerRef);

    const modalRef = service.open(MockComponent);

    expect(mockViewContainerRef.createComponent).toHaveBeenCalled();
    expect(modalRef).toBeInstanceOf(ModalRef);
    expect(mockComponentRef.setInput).not.toHaveBeenCalled();
  });

  it('should pass data to the created component', () => {
    const mockComponentRef = jasmine.createSpyObj('ComponentRef', ['setInput', 'destroy']);
    mockViewContainerRef.createComponent.and.returnValue(mockComponentRef);

    service.setViewContainerRef(mockViewContainerRef);

    const data = {name: 'Test'};
    const modalRef = service.open(MockComponent, data);

    expect(mockComponentRef.setInput).toHaveBeenCalledWith('name', 'Test');
  });
});
