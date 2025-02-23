import {Component, input} from '@angular/core';

@Component({
  selector: 'app-alert',
  imports: [],
  templateUrl: './alert.component.html',
  standalone: true,
  styleUrl: './alert.component.scss'
})
export class AlertComponent {

  type = input<'success' | 'error' | 'info'>('info');
  titleText = input('');
  message = input('');
  icon = input('fa-solid fa-triangle-exclamation');

  get classes() {
    return `alert alert-${this.type()}`;
  }
}
