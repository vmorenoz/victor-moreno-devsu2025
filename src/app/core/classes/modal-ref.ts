import {Subject} from 'rxjs';
import {ComponentRef} from '@angular/core';

export class ModalRef<T> {
  private afterClosed$ = new Subject<any>();
  private componentRef!: ComponentRef<T>;

  close(result?: any) {
    this.componentRef?.destroy();
    this.afterClosed$.next(result);
    this.afterClosed$.complete();
  }

  afterClosed() {
    return this.afterClosed$.asObservable();
  }

  setComponentRef(componentRef: ComponentRef<T>) {
    this.componentRef = componentRef;
  }
}
