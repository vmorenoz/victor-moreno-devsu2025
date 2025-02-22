import {Component, inject, input} from '@angular/core';
import {ModalRef} from '@core/classes/modal-ref';
import {ModalWrapperComponent} from '../../atoms/modal-wrapper/modal-wrapper.component';
import {ButtonComponent} from '../../atoms/button/button.component';

@Component({
  selector: 'app-dialog-confirm-modal',
  imports: [
    ModalWrapperComponent,
    ButtonComponent
  ],
  templateUrl: './dialog-confirm-modal.component.html',
  standalone: true,
  styleUrl: './dialog-confirm-modal.component.scss'
})
export class DialogConfirmModalComponent {

  titleText = input('Confirmar acción');
  message = input('¿Estás seguro de que quieres realizar esta acción?');
  showCancel = input(true);
  showConfirm = input(true);
  confirmText = input('Confirmar');
  cancelText = input('Cancelar');

  readonly modalRef = inject(ModalRef);

  handleConfirm(result: boolean) {
    this.modalRef.close(result);
  }
}
