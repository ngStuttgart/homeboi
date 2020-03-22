import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  getProductAction,
  deleteProductAction,
  getProductsAction,
  getProductsSuccessAction, getProductSuccessAction,
  submitProductAction,
  submitProductSuccessAction, editProductAction, editProductSuccessAction
} from './company.actions';
import { exhaustMap, map, mapTo, pluck, switchMap, take, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Product } from '@homeboi/api-interfaces';
import { select, Store } from '@ngrx/store';
import { CompanyState } from './company.reducer';
import { selectProduct } from './company.selectors';
import { Router } from '@angular/router';
import { RouterState, selectRouteParam } from '../../+state/router.selectors';

@Injectable({ providedIn: 'root' })
export class CompanyEffects {
  submitProduct$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(submitProductAction),
        switchMap(() => this.store.pipe(select(selectProduct)).pipe(take(1))),
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
      map(products => getProductsSuccessAction({ products }))
    ),
    { useEffectsErrorHandler: true });

  deleteProduct$ = createEffect(
    () => this.actions$.pipe(
      ofType(deleteProductAction),
      pluck('productId'),
      switchMap((productId: string) => this.httpClient.delete(`/api/products/${productId}`)),
      mapTo(getProductsAction())
    ),
    { useEffectsErrorHandler: true });

  getProduct$ = createEffect(
    () => this.actions$.pipe(
      ofType(getProductAction),
      switchMap(() => this.store.pipe(select(selectRouteParam('id'))).pipe(take(1))),
      switchMap(productId => this.httpClient.get<Product>(`/api/products/${productId}`)),
      map(product => getProductSuccessAction({ product }))
    )
  );

  editProduct$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(editProductAction),
        switchMap(() => this.store.pipe(select(selectProduct)).pipe(take(1))),
        exhaustMap(product =>
          this.httpClient.put<Product>('/api/products', product)
        ),
        map(() => editProductSuccessAction()),
        tap(() => this.router.navigateByUrl('/company'))
      ),
    { useEffectsErrorHandler: true }
  );

  constructor(private actions$: Actions, private httpClient: HttpClient,
              private store: Store<CompanyState & RouterState>, private router: Router) {
  }
}
