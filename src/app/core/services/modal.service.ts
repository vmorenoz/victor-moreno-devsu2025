import {Injectable, Type, ViewContainerRef} from '@angular/core';
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
      throw new Error('ModalService: No se ha configurado el contenedor de modales.');
    }

    const componentRef = this.viewContainerRef.createComponent(component);
    if (data) {
      Object.keys(data).forEach(key => {
        componentRef.setInput(key, data[key]);
      });
    }

    return new ModalRef<T>(componentRef);
  }
}
