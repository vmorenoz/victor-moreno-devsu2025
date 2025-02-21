import {AfterViewInit, Component, inject, viewChild, ViewContainerRef} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ModalService} from '@core/services/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  readonly modalContainerRef = viewChild('modalContainer', {read: ViewContainerRef});
  readonly modalService = inject(ModalService);

  ngAfterViewInit() {
    this.modalService.setViewContainerRef(this.modalContainerRef());
  }
}
