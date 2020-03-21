import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '@homeboi/api-interfaces';
import { Store } from '@ngrx/store';
import { AppState } from '../+state/app.reducer';
import { selectProducts } from '../+state/app.selectors';
import { tap } from 'rxjs/operators';
import { getProductsAction } from '../+state/app.actions';

@Component({
  selector: 'homeboi-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  products$: Observable<Product[]> = this.store
    .select(selectProducts)
    .pipe(tap(products => console.log('products: ', products)));

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(getProductsAction());
  }
}
