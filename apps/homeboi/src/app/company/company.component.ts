import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { CompanyState } from './+state/company.reducer';
import { Observable, Subject } from 'rxjs';
import { Product } from '@homeboi/api-interfaces';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { takeUntil } from 'rxjs/operators';
import { deleteProductAction, getProductsAction } from './+state/company.actions';
import { selectProducts } from './+state/company.selectors';
import { MatDialog } from '@angular/material/dialog';
import { ShowPictureDialogComponent } from '../dialogs/show-picture-dialog/show-picture-dialog.component';

class ProductsDataSource extends DataSource<Product> {
  private destroy$ = new Subject<void>();

  constructor(private readonly products$: Observable<Product[]>) {
    super();
  }

  connect(
    collectionViewer: CollectionViewer
  ): Observable<Product[] | ReadonlyArray<Product>> {
    return this.products$.pipe(takeUntil(this.destroy$));
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.destroy$.next();
  }
}

@Component({
  selector: 'homeboi-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  displayedColumns: Array<Partial<keyof Product> | 'options'> = [
    'title',
    'productType',
    'price',
    'paymentDuration',
    'options'
  ];

  products$: Observable<Product[] | undefined> = this.store.pipe(
    select(selectProducts)
  );

  productsDatabase = new ProductsDataSource(this.products$);

  constructor(private store: Store<CompanyState>, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.store.dispatch(getProductsAction());
  }

  showPicture(product: Product): void {
    this.dialog.open(ShowPictureDialogComponent, { data: product });
  }

  deleteProduct(productId: string): void {
    this.store.dispatch(deleteProductAction({ productId }));
  }
}
