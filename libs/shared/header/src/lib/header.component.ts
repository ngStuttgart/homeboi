import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ProductQuery, ProductType } from '@homeboi/api-interfaces';
import { FormControl, FormGroup } from '@angular/forms';
import { KeyValue } from '@angular/common';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'homeboi-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() showInseratButton: boolean;
  @Input() notificationsUrl: string;

  @Output() productQuery = new EventEmitter<ProductQuery>();

  productTypes: Array<KeyValue<ProductType, string>> = [
    { key: ProductType.MONITOR, value: 'Monitor' },
    { key: ProductType.TISCH, value: 'Tisch' },
    { key: ProductType.STUHL, value: 'Stuhl' },
    { key: ProductType.MAUS, value: 'Maus' },
    { key: ProductType.TASTATUR, value: 'Tastatur' },
    { key: ProductType.HEADSET, value: 'Headset' },
    { key: ProductType.DRUCKER, value: 'Drucker' },
    { key: ProductType.LAUTSPRECHER, value: 'Lautsprecher' },
    { key: ProductType.WEBCAM, value: 'Webcam' },
    { key: ProductType.WHITEBOARD, value: 'Whiteboard' },
    { key: ProductType.SONSTIGES, value: 'Sonstiges' }
  ];

  showFilter = false;
  formGroup = new FormGroup({
    title: new FormControl(''),
    productType: new FormControl([]),
    priceMin: new FormControl(undefined),
    priceMax: new FormControl(undefined)
  });
  showSearchbar = false;

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.formGroup.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((productQuery: ProductQuery) => this.productQuery.emit(productQuery));
  }

  toggleSearchbar(): void {
    this.showSearchbar = !this.showSearchbar;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
