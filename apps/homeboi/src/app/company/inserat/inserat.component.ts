import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { fromEvent, Observable, Subject } from 'rxjs';
import { PaymentDuration, Product, ProductType } from '@homeboi/api-interfaces';
import { select, Store } from '@ngrx/store';
import { CompanyState } from '../+state/company.reducer';
import { selectProduct, selectProductSubmitted } from '../+state/company.selectors';
import { filter, map, takeUntil } from 'rxjs/operators';
import {
  addImageAction,
  resetImageAction,
  resetProductAction,
  setProductAction,
  submitProductAction
} from '../+state/company.actions';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

interface Option<T, R> {
  value: T;
  viewValue: R;
  disabled?: boolean;
}

@Component({
  selector: 'homeboi-inserat',
  templateUrl: './inserat.component.html',
  styleUrls: ['./inserat.component.scss']
})
export class InseratComponent implements OnDestroy {
  constructor(private store: Store<CompanyState>) {}

  get imageCtrl(): FormControl {
    return this.inseratGroup.get('image') as FormControl;
  }
  product$: Observable<Partial<Product>> = this.store.pipe(
    select(selectProduct)
  );

  tags: string[] = [];

  productSubmitted$: Observable<boolean> = this.store.pipe(
    select(selectProductSubmitted)
  );

  inseratGroup = new FormGroup({
    productType: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    width: new FormControl(''),
    height: new FormControl(''),
    depth: new FormControl(''),
    price: new FormControl(''),
    paymentDuration: new FormControl(PaymentDuration.WEEKLY),
    image: new FormControl('', [Validators.required])
  });

  productTypes: Option<ProductType, string>[] = [
    { value: ProductType.MONITOR, viewValue: 'Monitor' },
    { value: ProductType.TISCH, viewValue: 'Tisch' },
    { value: ProductType.STUHL, viewValue: 'Stuhl' },
    { value: ProductType.MAUS, viewValue: 'Maus' },
    { value: ProductType.TASTATUR, viewValue: 'Tastatur' },
    { value: ProductType.HEADSET, viewValue: 'Headset' },
    { value: ProductType.DRUCKER, viewValue: 'Drucker' },
    { value: ProductType.LAUTSPRECHER, viewValue: 'Lautsprecher' },
    { value: ProductType.WEBCAM, viewValue: 'Webcam' },
    { value: ProductType.WHITEBOARD, viewValue: 'Whiteboard' },
    { value: ProductType.SONSTIGES, viewValue: 'Sonstiges' }
  ];

  paymentDurationOptions: Option<PaymentDuration, string>[] = [
    { value: PaymentDuration.DAILY, viewValue: 'Täglich', disabled: true },
    {
      value: PaymentDuration.WEEKLY,
      viewValue: 'Wöchentlich',
      disabled: false
    },
    { value: PaymentDuration.MONTHLY, viewValue: 'Monatlich', disabled: true },
    {
      value: PaymentDuration.ONCE,
      viewValue: 'Einmalig bei Rückgabe',
      disabled: true
    }
  ];

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  private destroy$ = new Subject<void>();

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value.trim();

    if (value && this.tags.indexOf(value) < 0) {
      this.tags.push(value);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeTag(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.store.dispatch(resetProductAction());
  }

  submit(): void {
    this.imageCtrl.markAsTouched();

    if (this.inseratGroup.valid) {
      const product = {
        ...this.removeOptionalProperties(this.inseratGroup.getRawValue()),
        tags: [...this.tags]
      };

      this.store.dispatch(
        setProductAction({
          product
        })
      );
      this.store.dispatch(submitProductAction());
    }
  }

  uploadFile(event: Event): void {
    this.imageCtrl.markAsTouched();

    const target: HTMLInputElement = event.target as HTMLInputElement;
    const file = target.files[0];
    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);

    fromEvent(fileReader, 'load')
      .pipe(
        map(() => fileReader.result),
        filter<string>(Boolean),
        takeUntil(this.destroy$)
      )
      .subscribe(image => {
        this.store.dispatch(addImageAction({ image }));
        this.inseratGroup.patchValue({ image });
      });
  }

  deleteImage(): void {
    this.store.dispatch(resetImageAction());
    this.inseratGroup.patchValue({ image: '' });
  }

  removeOptionalProperties(product: Product): Product {
    const filteredProduct: Partial<Product> = {};

    for (const key in product) {
      if (product.hasOwnProperty(key) && Boolean(product[key])) {
        filteredProduct[key] = product[key];
      }
    }

    return filteredProduct as Product;
  }
}
