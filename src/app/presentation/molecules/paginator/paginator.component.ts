import {Component, computed, input, OnInit, output, signal} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {ButtonComponent} from '../../atoms/button/button.component';

@Component({
  selector: 'app-paginator',
  imports: [
    ReactiveFormsModule,
    ButtonComponent
  ],
  templateUrl: './paginator.component.html',
  standalone: true,
  styleUrl: './paginator.component.scss'
})
export class PaginatorComponent implements OnInit {

  totalItems = input(0);
  onPage = output<{ page: number, size: number }>();

  pageSize = signal(5);
  currentPage = signal(0);
  totalPages = computed(() => Math.ceil(this.totalItems() / this.pageSize()));

  pageSizeControl = new FormControl<number>(5);

  ngOnInit() {
    this.pageSizeControl.valueChanges.subscribe(value => this.handlePageSizeChange(value ?? 5));
  }

  handlePageSizeChange(value: number) {
    this.pageSize.set(value);
    this.emitOnPage();
  }

  handlePageChange(value: number) {
    this.currentPage.set(value);
    this.emitOnPage();
  }

  emitOnPage() {
    this.onPage.emit({
      page: this.currentPage(),
      size: +this.pageSize(),
    });
  }
}
