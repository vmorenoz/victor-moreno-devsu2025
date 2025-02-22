import {Component, inject} from '@angular/core';
import {ModalWrapperComponent} from '../../atoms/modal-wrapper/modal-wrapper.component';
import {ModalRef} from '@core/classes/modal-ref';
import {ProductFormComponent} from '../../organisms/product-form/product-form.component';
import {Product} from '../../../data/models/product.model';
import {ProductStoreService} from '../../../data/stores/product-store.service';

@Component({
  selector: 'app-create-product-modal',
  imports: [
    ModalWrapperComponent,
    ProductFormComponent
  ],
  templateUrl: './create-product-modal.component.html',
  standalone: true,
  styleUrl: './create-product-modal.component.scss'
})
export class CreateProductModalComponent {

  readonly modalRef = inject(ModalRef);
  readonly productStore = inject(ProductStoreService);

  handleClose() {
    this.modalRef.close();
  }

  handleSubmit(formData: Product) {
    this.productStore
      .addProduct(formData)
      .subscribe(product => this.modalRef.close(product));
  }
}
