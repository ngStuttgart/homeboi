import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  submitProductAction,
  submitProductSuccessAction
} from './company.actions';
import { exhaustMap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Product } from '@homeboi/api-interfaces';

@Injectable({ providedIn: 'root' })
export class CompanyEffects {
  submitProduct$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(submitProductAction),
        exhaustMap(product =>
          this.httpClient.post<Product>('/api/products', product)
        ),
        map(() => submitProductSuccessAction())
      ),
    { useEffectsErrorHandler: true }
  );

  constructor(private actions$: Actions, private httpClient: HttpClient) {}
}
