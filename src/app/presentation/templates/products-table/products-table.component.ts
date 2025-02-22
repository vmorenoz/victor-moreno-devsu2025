import {Component, inject, input} from '@angular/core';
import {DatePipe} from '@angular/common';
import {Product} from '../../../data/models/product.model';
import {ModalService} from '@core/services/modal.service';
import {ProductService} from '@services/product.service';
import {DialogConfirmModalComponent} from '../dialog-confirm-modal/dialog-confirm-modal.component';
import {MenuButtonComponent} from '../../atoms/menu-button/menu-button.component';

@Component({
  selector: 'app-products-table',
  imports: [
    DatePipe,
    MenuButtonComponent
  ],
  templateUrl: './products-table.component.html',
  standalone: true,
  styleUrl: './products-table.component.scss'
})
export class ProductsTableComponent {

  readonly modalService = inject(ModalService);
  readonly productService = inject(ProductService);

  products = input<Product[]>([]);

  options = [
    {label: 'Editar', value: 'edit'},
    {label: 'Eliminar', value: 'delete'}
  ]

  handleMenuSelection(value: string, product: Product) {
    switch (value) {
      case 'edit':
        alert('Editando producto');
        break;
      case 'delete':
        this.handleDelete(product);
        break;
    }
  }

  handleDelete(product: Product) {
    const modalRef = this.modalService.open(DialogConfirmModalComponent, {
      titleText: 'Confirmar eliminación',
      message: `¿Estás seguro de que quieres eliminar el producto ${product.name}?`,
    });

    modalRef.afterClosed().subscribe(result => {
      if(!result) return;


    });
  }

  private deleteProduct(product: Product) {
    this.productService.deleteProduct(product.id).subscribe(response => {
      console.log(response);
    });
  }
}
