import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  inject,
  Injector,
  input,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, NgControl, ValidationErrors} from '@angular/forms';
import {InputLabelComponent} from '../../atoms/input-label/input-label.component';
import {NgClass} from '@angular/common';
import {InputErrorsComponent} from '../../atoms/input-errors/input-errors.component';

@Component({
  selector: 'app-text-input',
  imports: [
    InputLabelComponent,
    FormsModule,
    NgClass,
    InputErrorsComponent
  ],
  templateUrl: './text-input.component.html',
  standalone: true,
  styleUrl: './text-input.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true
    }
  ]
})
export class TextInputComponent implements ControlValueAccessor, OnInit {

  readonly injector = inject(Injector);
  readonly cd = inject(ChangeDetectorRef);

  label = input('');
  placeholder = input<string>('');
  type = input<'text' | 'date'>('text');

  value!: string;
  disabled: boolean = false;
  ngControl!: NgControl | null;
  onChange: (value: string) => void = () => {
  };
  onTouched: () => void = () => {
  };

  ngOnInit() {
    setTimeout(() => {
      this.ngControl = this.injector.get(NgControl);
      if (this.ngControl != null) {
        this.ngControl.valueAccessor = this;
      }
    });
  }

  get validationErrors(): ValidationErrors {
    return this.ngControl?.errors ? this.ngControl.errors : {} as ValidationErrors;
  }

  get isTouched() {
    return this.ngControl ? this.ngControl?.touched : false;
  }

  get isInvalid() {
    return this.ngControl ? this.ngControl?.invalid : false;
  }

  writeValue(value: string): void {
    this.value = value;
    this.cd.detectChanges();
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  updateValue(inputEvent: Event): void {
    const value = (inputEvent.target as HTMLInputElement).value;
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }
}
