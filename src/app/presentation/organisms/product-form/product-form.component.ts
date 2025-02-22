import {Component, inject, input, OnInit, output} from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {catchError, distinctUntilChanged, filter, map, Observable, of, switchMap, timer} from 'rxjs';
import {ButtonComponent} from '../../atoms/button/button.component';
import {TextInputComponent} from '../../molecules/text-input/text-input.component';
import {Product} from '../../../data/models/product.model';
import {DatePipe} from '@angular/common';
import {ProductStoreService} from '../../../data/stores/product-store.service';

export interface ProductFormData {
  id?: FormControl<string | null>;
  name: FormControl<string | null>;
  description: FormControl<string | null>;
  logo: FormControl<string | null>;
  date_release: FormControl<string | null>;
  date_revision: FormControl<string | null>;
}

@Component({
  selector: 'app-product-form',
  imports: [
    ButtonComponent,
    ReactiveFormsModule,
    TextInputComponent,
  ],
  templateUrl: './product-form.component.html',
  standalone: true,
  styleUrl: './product-form.component.scss',
  providers: [
    DatePipe
  ]
})
export class ProductFormComponent implements OnInit {
  readonly formBuilder = inject(FormBuilder);
  readonly productStore = inject(ProductStoreService);
  readonly datePipe = inject(DatePipe);

  readonly initialData = input<Product | null>(null);
  readonly onSUbmit = output<Product>();
  readonly onClear = output();

  productForm!: FormGroup<ProductFormData>;
  cacheSet = new Map<string, Observable<ValidationErrors | null>>();

  ngOnInit() {
    this.initForm();
  }

  handleSubmit() {
    const value = this.productForm.getRawValue();
    this.onSUbmit.emit(value as unknown as Product);
  }

  handleClear() {
    this.productForm.reset();
    this.onClear.emit();
  }

  private initForm() {
    this.productForm = this.formBuilder.group<ProductFormData>({
      id: this.formBuilder.control<string>('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(10),
      ], [
        this.productExistenceValidator()
      ]),
      name: this.formBuilder.control<string>('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100)
      ]),
      description: this.formBuilder.control<string>('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(100)
      ]),
      logo: this.formBuilder.control<string>('', [
        Validators.required,
      ]),
      date_release: this.formBuilder.control<string | null>(null, [
        Validators.required,
        this.futureDateValidator()
      ]),
      date_revision: this.formBuilder.control<string | null>({
        value: null,
        disabled: true
      }, Validators.required),
    });
    if (this.initialData()) {
      this.productForm.patchValue({
        ...this.initialData(),
        date_release: this.datePipe.transform(this.initialData()?.date_release, 'yyyy-MM-dd'),
        date_revision: this.datePipe.transform(this.initialData()?.date_revision, 'yyyy-MM-dd'),
      });
      this.productForm.controls.id?.disable();
    }
    this.initFormListeners();
  }

  private futureDateValidator(minDate: Date = new Date()): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const controlValue = new Date(control.value);
      controlValue.setMinutes(controlValue.getMinutes() + controlValue.getTimezoneOffset());
      minDate.setHours(0, 0, 0, 0);
      if (controlValue < minDate) {
        return {'pastDate': minDate};
      }
      return null;
    };
  }

  private productExistenceValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null);
      }

      const cachedResult = this.cacheSet.get(control.value);
      if (cachedResult) {
        return cachedResult;
      }

      return timer(300).pipe(
        switchMap(() => {
          return this.productStore.verifyExistence(control.value).pipe(
            map(response => {
              return response ? {duplicated: response} : null;
            }),
            catchError(() => of({duplicated: true}))
          );
        }),
        distinctUntilChanged(),
      );
    };
  }

  private initFormListeners() {
    this.productForm.controls.date_release
      .valueChanges
      .pipe(filter(date => !!date))
      .subscribe(date => {
        const revisionDate = new Date(date!);
        revisionDate.setMinutes(revisionDate.getMinutes() + revisionDate.getTimezoneOffset());
        revisionDate.setFullYear(revisionDate.getFullYear() + 1);

        this.productForm.controls.date_revision.setValue(this.datePipe.transform(revisionDate, 'yyyy-MM-dd'));
      });
  }
}
