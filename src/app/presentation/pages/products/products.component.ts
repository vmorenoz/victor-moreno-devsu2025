import {Component, inject, OnInit} from '@angular/core';
import {ModalService} from '@core/services/modal.service';
import {CreateProductModalComponent} from '../../templates/create-product-modal/create-product-modal.component';
import {ButtonComponent} from '../../atoms/button/button.component';
import {ProductsTableComponent} from '../../templates/products-table/products-table.component';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {TextInputComponent} from '../../molecules/text-input/text-input.component';
import {debounceTime} from 'rxjs';
import {PaginatorComponent} from '../../molecules/paginator/paginator.component';
import {ProductStoreService} from '../../../data/stores/product-store.service';
import {SkeletonComponent} from '../../atoms/skeleton/skeleton.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  standalone: true,
  imports: [
    ButtonComponent,
    ProductsTableComponent,
    TextInputComponent,
    ReactiveFormsModule,
    PaginatorComponent,
    SkeletonComponent
  ],
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  readonly modalService = inject(ModalService);
  readonly productStore = inject(ProductStoreService);

  searchControl = new FormControl<string>('');

  ngOnInit() {
    this.searchControl
      .valueChanges
      .pipe(debounceTime(300))
      .subscribe(value => this.handleSearch(value));
  }

  createProduct() {
    this.modalService.open(CreateProductModalComponent);
  }

  handleSearch(value: string | null) {
    this.productStore.searchWords.set(value ?? '');
  }

  handlePageChange(value: { page: number, size: number }) {
    this.productStore.currentPage.set(value.page);
    this.productStore.pageSize.set(value.size);
  }
}
