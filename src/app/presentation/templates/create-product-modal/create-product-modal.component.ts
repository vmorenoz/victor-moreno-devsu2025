import { Component } from '@angular/core';
import {ModalWrapperComponent} from '../../atoms/modal-wrapper/modal-wrapper.component';

@Component({
  selector: 'app-create-product-modal',
  imports: [
    ModalWrapperComponent
  ],
  templateUrl: './create-product-modal.component.html',
  standalone: true,
  styleUrl: './create-product-modal.component.scss'
})
export class CreateProductModalComponent {

}
