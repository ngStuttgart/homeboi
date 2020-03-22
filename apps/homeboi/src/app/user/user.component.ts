import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { Product, ProductQuery } from '@homeboi/api-interfaces';
import { select, Store } from '@ngrx/store';
import { AppState } from '../+state/app.reducer';
import { selectProducts, selectProductsLoading } from '../+state/app.selectors';
import { getProductsAction } from '../+state/app.actions';
import { map } from 'rxjs/operators';

@Component({
  selector: 'homeboi-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  productsLoading$: Observable<boolean> = this.store.pipe(
    select(selectProductsLoading)
  );

  products$: Observable<Product[]> = this.store.pipe(
    select(selectProducts)
  );
  filter$ = new BehaviorSubject<ProductQuery>({});

  filteredProducts$ = combineLatest([this.products$, this.filter$]).pipe(map(this.filterProducts));

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(getProductsAction());
  }

  filter(productQuery: ProductQuery): void {
    this.filter$.next(productQuery);
  }

  private filterProducts([products, query]): Product[] {
    let filtered: Product[] = products;
    if (query.title) {
      filtered = filtered.filter(product => product.title.toLowerCase().includes(query.title.toLowerCase()));
    }
    if (query.productType && query.productType.length > 0) {
      filtered = filtered.filter(product => query.productType.includes(product.productType));
    }
    if (query.priceMin) {
      filtered = filtered.filter(product => product.price >= query.priceMin);
    }
    if (query.priceMax) {
      filtered = filtered.filter(product => product.price <= query.priceMax);
    }
    return filtered;
  }
}
