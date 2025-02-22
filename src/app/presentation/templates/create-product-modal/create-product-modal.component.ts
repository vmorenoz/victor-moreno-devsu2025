import {Component, inject} from '@angular/core';
import {ModalWrapperComponent} from '../../atoms/modal-wrapper/modal-wrapper.component';
import {ModalRef} from '@core/classes/modal-ref';
import {ReactiveFormsModule} from '@angular/forms';
import {TextInputComponent} from '../../molecules/text-input/text-input.component';
import {ButtonComponent} from '../../atoms/button/button.component';
import {ProductFormComponent} from '../../organisms/product-form/product-form.component';
import {ProductService} from '@services/product.service';
import {Product} from '../../../data/models/product.model';

@Component({
  selector: 'app-create-product-modal',
  imports: [
    ModalWrapperComponent,
    ReactiveFormsModule,
    TextInputComponent,
    ButtonComponent,
    ProductFormComponent
  ],
  templateUrl: './create-product-modal.component.html',
  standalone: true,
  styleUrl: './create-product-modal.component.scss'
})
export class CreateProductModalComponent {

  readonly modalRef = inject(ModalRef);
  readonly productService = inject(ProductService);

  handleClose() {
    this.modalRef.close();
  }

  handleSubmit(formData: Product) {
    this.productService
      .createProduct(formData)
      .subscribe(product => this.modalRef.close(product));
  }
}
