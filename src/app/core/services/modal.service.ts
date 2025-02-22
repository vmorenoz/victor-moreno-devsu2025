import {Injectable, Injector, Type, ViewContainerRef} from '@angular/core';
import {ModalRef} from '@core/classes/modal-ref';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private viewContainerRef: ViewContainerRef | null = null;

  setViewContainerRef(vc: ViewContainerRef | undefined) {
    if (vc) {
      this.viewContainerRef = vc;
    }
  }

  open<T>(component: Type<T>, data?: any): ModalRef<T> {
    if (!this.viewContainerRef) {
      throw new Error('No ViewContainerRef set! Asegúrate de llamarlo en el módulo o componente principal.');
    }

    const modalRef = new ModalRef<T>();

    const injector = Injector.create({
      providers: [{provide: ModalRef, useValue: modalRef}],
    });

    const componentRef = this.viewContainerRef.createComponent(component, {
      injector,
    });

    if (data) {
      Object.keys(data).forEach(key => componentRef.setInput(key, data[key]));
    }

    modalRef.setComponentRef(componentRef);

    return modalRef as ModalRef<T>;
  }
}
