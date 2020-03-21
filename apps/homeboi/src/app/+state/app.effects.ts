import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import {
  getProductsAction,
  getProductsSuccessAction,
  loginAction,
  loginErrorAction,
  loginSuccessAction, setNotificationAction,
  signupAction,
  signupSuccessAction
} from './app.actions';
import { catchError, exhaustMap, filter, map, tap } from 'rxjs/operators';
import { Product, Signup } from '@homeboi/api-interfaces';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from './app.reducer';
import { throwError } from 'rxjs';
import { NotificationService } from '../notifactions/notification.service';

@Injectable({ providedIn: 'root' })
export class AppEffects {
  login$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginAction),
        exhaustMap(({ credentials }) =>
          this.httpClient.post<Signup>('/api/user/login', credentials).pipe(
            catchError(() => {
              this.store.dispatch(loginErrorAction({ loginError: 'error' }));
              return throwError('error');
            }),
            tap(({ accountType }) =>
              this.router.navigateByUrl(`/${accountType.toLowerCase()}`)
            )
          )
        ),
        map(user => loginSuccessAction({ user }))
      ),
    { useEffectsErrorHandler: true }
  );

  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signupAction),
      exhaustMap(({ signup }) =>
        this.httpClient
          .post<Signup>('/api/user/signup', signup)
          .pipe(
            tap(() =>
              this.router.navigateByUrl(`/${signup.accountType.toLowerCase()}`)
            )
          )
      ),
      map(() => signupSuccessAction())
    )
  );

  products$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getProductsAction),
      filter(Boolean),
      exhaustMap(() =>
        this.httpClient.get<Product[]>(`/api/products`)
      ),
      map((products: Product[]) =>
        getProductsSuccessAction({ products: products })
      )
    )
  );

  notifications$ = createEffect(() =>
    this.notificationService.notification$.pipe(
      map(notification => setNotificationAction({notification}))
    )
  );

  constructor(
    private actions$: Actions,
    private httpClient: HttpClient,
    private router: Router,
    private store: Store<AppState>,
    private notificationService: NotificationService
  ) {}
}
