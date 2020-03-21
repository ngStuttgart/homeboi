import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import {
  getNotificationsAction,
  getNotificationsSuccessAction,
  getProductsAction,
  getProductsSuccessAction,
  loginAction,
  loginErrorAction,
  loginSuccessAction,
  setNotificationAction,
  signupAction,
  signupSuccessAction
} from './app.actions';
import { catchError, exhaustMap, filter, map, switchMap, tap } from 'rxjs/operators';
import { Notification, Product, Signup } from '@homeboi/api-interfaces';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from './app.reducer';
import { throwError } from 'rxjs';
import { NotificationService } from '../notifications/notification.service';

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
    ), { useEffectsErrorHandler: true }
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
      ),
    { useEffectsErrorHandler: true }
  );

  getSocketNotifications$ = createEffect(() =>
    this.notificationService.notification$.pipe(
      map(notification => setNotificationAction({ notification }))
    ), { useEffectsErrorHandler: true }
  );

  getNotifications$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getNotificationsAction),
      switchMap(() => {
        return this.httpClient.get<Notification[]>('/api/notifications');
      }),
      map((notifications) => {
        return getNotificationsSuccessAction({ notifications });
      })
    );
  }, { useEffectsErrorHandler: true });


  constructor(
    private actions$: Actions,
    private httpClient: HttpClient,
    private router: Router,
    private store: Store<AppState>,
    private notificationService: NotificationService
  ) {
  }
}
