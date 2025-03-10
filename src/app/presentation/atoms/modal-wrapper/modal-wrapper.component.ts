import {Component, input, output} from '@angular/core';

@Component({
  selector: 'app-modal-wrapper',
  imports: [],
  templateUrl: './modal-wrapper.component.html',
  standalone: true,
  styleUrl: './modal-wrapper.component.scss'
})
export class ModalWrapperComponent {

  titleText = input();
  onClose = output();

  closeModal() {
    this.onClose.emit();
  }
}
