import {Component, ElementRef, HostListener, input, output, viewChild} from '@angular/core';

@Component({
  selector: 'app-menu-button',
  imports: [],
  templateUrl: './menu-button.component.html',
  standalone: true,
  styleUrl: './menu-button.component.scss'
})
export class MenuButtonComponent {

  readonly dropdownMenu = viewChild<ElementRef>('dropdownMenu');

  options = input<{ label: string; value: string }[]>([]);
  onSelect = output<string>();

  isOpen = false;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  handleSelect(value: string) {
    this.onSelect.emit(value);
    this.isOpen = false;
  }

  @HostListener('document:click', ['$event'])
  closeDropdown(event: Event) {
    if (this.isOpen && this.dropdownMenu() && !this.dropdownMenu()?.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }
}
