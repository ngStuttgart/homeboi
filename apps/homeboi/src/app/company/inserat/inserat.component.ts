import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { fromEvent, Observable, Subject } from 'rxjs';
import { PaymentDuration, Product } from '@homeboi/api-interfaces';
import { select, Store } from '@ngrx/store';
import { CompanyState } from '../+state/company.reducer';
import {
  selectProduct,
  selectProductSubmitted
} from '../+state/company.selectors';
import { filter, map, takeUntil } from 'rxjs/operators';
import {
  addImageAction,
  resetImageAction,
  setProductAction,
  submitProductAction
} from '../+state/company.actions';

interface ProductType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'homeboi-inserat',
  templateUrl: './inserat.component.html',
  styleUrls: ['./inserat.component.scss']
})
export class InseratComponent implements OnDestroy {
  product$: Observable<Partial<Product>> = this.store.pipe(
    select(selectProduct)
  );

  productSubmitted$: Observable<boolean> = this.store.pipe(
    select(selectProductSubmitted)
  );

  inseratGroup = new FormGroup({
    productType: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    width: new FormControl('', [Validators.required]),
    height: new FormControl('', [Validators.required]),
    depth: new FormControl(''),
    price: new FormControl(''),
    paymentDuration: new FormControl({
      value: PaymentDuration.WEEKLY,
      disabled: true
    }),
    image: new FormControl('', [Validators.required])
  });

  productTypes: ProductType[] = [
    { value: 'MONITOR', viewValue: 'Monitor' },
    { value: 'TISCH', viewValue: 'Tisch' },
    { value: 'STUHL', viewValue: 'Stuhl' },
    { value: 'MAUS', viewValue: 'Maus' },
    { value: 'TASTATUR', viewValue: 'Tastatur' },
    { value: 'HEADSET', viewValue: 'Headset' },
    { value: 'DRUCKER', viewValue: 'Drucker' },
    { value: 'LAUTSPRECHER', viewValue: 'Lautsprecher' },
    { value: 'WEBCAM', viewValue: 'Webcam' },
    { value: 'WHITEBOARD', viewValue: 'Whiteboard' },
    { value: 'SONSTIGES', viewValue: 'Sonstiges' }
  ];

  private destroy$$ = new Subject<void>();

  constructor(private store: Store<CompanyState>) {}

  ngOnDestroy(): void {
    this.destroy$$.next();
  }

  get imageCtrl(): FormControl {
    return this.inseratGroup.get('image') as FormControl;
  }

  submit(): void {
    this.imageCtrl.markAsTouched();

    if (this.inseratGroup.valid) {
      this.store.dispatch(
        setProductAction({ product: this.inseratGroup.getRawValue() })
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
        filter(Boolean),
        map((base64: string) => base64.replace('data:image/jpeg;base64,', '')),
        takeUntil(this.destroy$$)
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
}
