import {Component, input, output} from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  standalone: true,
  styleUrl: './button.component.scss'
})
export class ButtonComponent {

  type = input<'button' | 'submit' | 'reset'>('button');
  color = input<'default' | 'primary' | 'secondary' | 'tertiary' | 'accent'>('default');
  disabled = input(false);

  onClick = output();

  get classes() {
    return `app-btn btn-${this.color()}`
  }

  handleClick() {
    this.onClick.emit();
  }
}
