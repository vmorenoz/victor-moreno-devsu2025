import {Component, input} from '@angular/core';
import {ValidationErrors} from '@angular/forms';

@Component({
  selector: 'app-input-errors',
  imports: [],
  templateUrl: './input-errors.component.html',
  standalone: true,
  styleUrl: './input-errors.component.scss'
})
export class InputErrorsComponent {

  errors = input<ValidationErrors>();

  errorMessages: { [key: string]: (value: any) => string } = {
    required: () => 'El campo es requerido',
    minlength: (error: any) => `El campo debe tener al menos ${error.requiredLength} caracteres`,
    maxlength: (error: any) => `El campo debe tener como máximo ${error.requiredLength} caracteres`,
    pastDate: (error: Date) => `La fecha debe ser igual o mayor que ${this.formatDate(error)}`,
    duplicated: () => 'El campo ya existe',
  }

  get errorsArray(): string[] {
    const errorsObject = this.errors();
    if (!errorsObject) {
      return [];
    }
    return Object.keys(errorsObject)
      .map((key) => {
        const error = errorsObject[key];
        const message = this.errorMessages[key];
        return message ? message(error) : 'El campo es inválido';
      });
  }

  formatDate(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}/${month < 10 ? '0' + month : month}/${day}`;
  }
}
