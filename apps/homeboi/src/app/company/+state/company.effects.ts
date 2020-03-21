import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  getProductsAction,
  getProductsSuccessAction,
  submitProductAction,
  submitProductSuccessAction
} from './company.actions';
import { exhaustMap, map, switchMap, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Product } from '@homeboi/api-interfaces';
import { select, Store } from '@ngrx/store';
import { CompanyState } from './company.reducer';
import { selectProduct } from './company.selectors';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class CompanyEffects {
  submitProduct$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(submitProductAction),
        switchMap(() => this.store.pipe(select(selectProduct))),
        exhaustMap(product =>
          this.httpClient.post<Product>('/api/products', product)
        ),
        map(() => submitProductSuccessAction()),
        tap(() => this.router.navigateByUrl('/company'))
      ),
    { useEffectsErrorHandler: true }
  );

  getProducts$ = createEffect(
    () => this.actions$.pipe(
      ofType(getProductsAction),
      switchMap(() => this.httpClient.get<Product[]>('/api/products/foruser')),
      map(products => getProductsSuccessAction({products}))
    ),
    { useEffectsErrorHandler: true });

  constructor(private actions$: Actions, private httpClient: HttpClient, private store: Store<CompanyState>, private router: Router) {}
}
