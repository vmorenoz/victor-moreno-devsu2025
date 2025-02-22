import {Component, inject, OnInit, signal} from '@angular/core';
import {ProductService} from '@services/product.service';
import {DatePipe} from '@angular/common';
import {ModalService} from '@core/services/modal.service';
import {CreateProductModalComponent} from '../../templates/create-product-modal/create-product-modal.component';
import {ButtonComponent} from '../../atoms/button/button.component';
import {Product} from '../../../data/models/product.model';
import {ProductsTableComponent} from '../../templates/products-table/products-table.component';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {TextInputComponent} from '../../molecules/text-input/text-input.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  standalone: true,
  imports: [
    DatePipe,
    ButtonComponent,
    ProductsTableComponent,
    TextInputComponent,
    ReactiveFormsModule
  ],
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  readonly productService = inject(ProductService);
  readonly modalService = inject(ModalService);

  searchControl = new FormControl('');

  ngOnInit() {
    this.loadProducts();
  }

  products = signal<Product[]>([]);

  createProduct() {
    this.modalService.open(CreateProductModalComponent);
  }

  loadProducts() {
    this.productService.getProducts().subscribe(products => this.products.set(products));
  }
}
