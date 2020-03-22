import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { AccountType, ProductQuery, ProductType } from '@homeboi/api-interfaces';
import { FormControl, FormGroup } from '@angular/forms';
import { DOCUMENT, KeyValue } from '@angular/common';
import { takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AppState } from '../+state/app.reducer';
import { logoutAction } from '../+state/app.actions';
import { selectNotificationCount, selectUserAccountType } from '../+state/app.selectors';

@Component({
  selector: 'homeboi-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() showInseratButton: boolean;
  @Input() showInputBar = true;

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

  public notificationCount$: Observable<number> = this.store.pipe(
    select(selectNotificationCount)
  );

  userAccountType$: Observable<AccountType> = this.store.pipe(
    select(selectUserAccountType)
  );

  private destroy$ = new Subject<void>();

  @HostListener('document:click', ['$event'])
  clickOutside(event) {
    if (!this.elementRef.nativeElement.contains(event.target) && !this.document.querySelector('div.mat-select-panel')) {
      this.showFilter = false;
    }
  }

  constructor(private store: Store<AppState>, private elementRef: ElementRef, @Inject(DOCUMENT) private document: Document) {
  }

  ngOnInit(): void {
    this.formGroup.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((productQuery: ProductQuery) => this.productQuery.emit(productQuery));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  logout(): void {
    this.store.dispatch(logoutAction());
  }
}
