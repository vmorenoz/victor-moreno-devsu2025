import {Component, inject, signal} from '@angular/core';
import {ModalWrapperComponent} from '../../atoms/modal-wrapper/modal-wrapper.component';
import {ModalRef} from '@core/classes/modal-ref';
import {ProductFormComponent} from '../../organisms/product-form/product-form.component';
import {Product} from '../../../data/models/product.model';
import {ProductStoreService} from '../../../data/stores/product-store.service';
import {AlertComponent} from '../../atoms/alert/alert.component';

@Component({
  selector: 'app-create-product-modal',
  imports: [
    ModalWrapperComponent,
    ProductFormComponent,
    AlertComponent
  ],
  templateUrl: './create-product-modal.component.html',
  standalone: true,
  styleUrl: './create-product-modal.component.scss'
})
export class CreateProductModalComponent {

  readonly modalRef = inject(ModalRef);
  readonly productStore = inject(ProductStoreService);

  errorMessage = signal('');

  handleClose() {
    this.modalRef.close();
  }

  handleSubmit(formData: Product) {
    this.productStore
      .addProduct(formData)
      .subscribe({
        next: product => this.modalRef.close(product),
        error: error => {
          this.errorMessage.set(error.message);
        },
      });
  }
}
