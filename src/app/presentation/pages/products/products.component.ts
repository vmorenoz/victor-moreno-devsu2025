import {Component, inject, OnInit} from '@angular/core';
import {ProductService} from '@services/product.service';
import {DatePipe} from '@angular/common';
import {ModalService} from '@core/services/modal.service';
import {CreateProductModalComponent} from '../../templates/create-product-modal/create-product-modal.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  standalone: true,
  imports: [
    DatePipe
  ],
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  readonly productService = inject(ProductService);
  readonly modalService = inject(ModalService);

  ngOnInit() {
    this.productService.getProducts().subscribe(products => console.log(products));
  }

  fakeProducts = [
    {
      id: '1',
      name: 'Producto 1',
      description: 'Descripción del producto 1',
      releaseDate: new Date(),
      restructureDate: new Date(),
      initials: 'P1'
    },
    {
      id: '2',
      name: 'Producto 2',
      description: 'Descripción del producto 2',
      releaseDate: new Date(),
      restructureDate: new Date(),
      initials: 'P2'
    },
    {
      id: '3',
      name: 'Producto 3',
      description: 'Descripción del producto 3',
      releaseDate: new Date(),
      restructureDate: new Date(),
      initials: 'P3'
    },
    {
      id: '4',
      name: 'Producto 4',
      description: 'Descripción del producto 4',
      releaseDate: new Date(),
      restructureDate: new Date(),
      initials: 'P4'
    },
    {
      id: '5',
      name: 'Producto 5',
      description: 'Descripción del producto 5',
      releaseDate: new Date(),
      restructureDate: new Date(),
      initials: 'P5'
    },
    {
      id: '6',
      name: 'Producto 6',
      description: 'Descripción del producto 6',
      releaseDate: new Date(),
      restructureDate: new Date(),
      initials: 'P6'
    }
  ];

  createProduct() {
    const modalRef = this.modalService.open(CreateProductModalComponent);
  }
}
