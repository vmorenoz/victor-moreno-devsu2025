import {Component, inject, input, signal} from '@angular/core';
import {Product} from '../../../data/models/product.model';
import {ModalWrapperComponent} from '../../atoms/modal-wrapper/modal-wrapper.component';
import {ProductFormComponent} from '../../organisms/product-form/product-form.component';
import {ModalRef} from '@core/classes/modal-ref';
import {ProductStoreService} from '../../../data/stores/product-store.service';
import {AlertComponent} from '../../atoms/alert/alert.component';

@Component({
  selector: 'app-edit-product-modal',
  imports: [
    ModalWrapperComponent,
    ProductFormComponent,
    AlertComponent
  ],
  templateUrl: './edit-product-modal.component.html',
  standalone: true,
  styleUrl: './edit-product-modal.component.scss'
})
export class EditProductModalComponent {

  readonly modalRef = inject(ModalRef);
  readonly productStore = inject(ProductStoreService);

  product = input<Product | null>(null);
  errorMessage = signal('');

  handleClose() {
    this.modalRef.close();
  }

  handleSubmit(formData: Product) {
    this.errorMessage.set('');
    this.productStore
      .updateProduct(formData)
      .subscribe({
        next: product => this.modalRef.close(product),
        error: error => {
          this.errorMessage.set(error.message);
        },
      });
  }
}
