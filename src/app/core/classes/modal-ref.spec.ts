import {ModalRef} from './modal-ref';
import {ComponentRef} from '@angular/core';
import {firstValueFrom} from 'rxjs';

describe('ModalRef', () => {

  let modalRef: ModalRef<any>;
  let mockComponentRef: jasmine.SpyObj<ComponentRef<any>>;

  beforeEach(() => {
    modalRef = new ModalRef();

    mockComponentRef = jasmine.createSpyObj<ComponentRef<any>>('ComponentRef', ['destroy']);

    modalRef.setComponentRef(mockComponentRef);
  });

  it('should create an instance', () => {
    expect(modalRef).toBeTruthy();
  });

  it('should close the modal and emit the result', async () => {
    const spy = jasmine.createSpy('afterClosedSpy');

    modalRef.afterClosed().subscribe(spy);

    modalRef.close('testResult');

    expect(mockComponentRef.destroy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith('testResult');
  });

  it('should complete the afterClosed observable when closed', async () => {
    const afterClosedPromise = firstValueFrom(modalRef.afterClosed());

    modalRef.close('testValue');

    await expectAsync(afterClosedPromise).toBeResolvedTo('testValue');
  });

  it('should allow setting a component reference', () => {
    const newMockComponentRef = jasmine.createSpyObj<ComponentRef<any>>('ComponentRef', ['destroy']);

    modalRef.setComponentRef(newMockComponentRef);

    modalRef.close();
    expect(newMockComponentRef.destroy).toHaveBeenCalled();
  });
});
