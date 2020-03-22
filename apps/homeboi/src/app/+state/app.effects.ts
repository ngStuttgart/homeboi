import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import {
  deleteNotificationAction,
  deleteNotificationSuccessAction,
  getNotificationsAction,
  getNotificationsSuccessAction,
  getProductsAction,
  getProductsSuccessAction,
  getUserAction,
  getUserErrorAction,
  getUserSuccessAction,
  loginAction,
  loginErrorAction,
  loginSuccessAction, logoutAction, logoutSuccessAction,
  setNotificationAction,
  signupAction,
  signupErrorAction,
  signupSuccessAction
} from './app.actions';
import { catchError, exhaustMap, filter, map, switchMap, take, tap } from 'rxjs/operators';
import { Notification, Product, Signup } from '@homeboi/api-interfaces';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppState } from './app.reducer';
import { throwError } from 'rxjs';
import { NotificationService } from '../notifications/notification.service';
import { selectUserOrError } from './app.selectors';

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
            catchError(() => {
              this.store.dispatch(signupErrorAction({signupError: 'error'}));
              return throwError('error');
            }),
            tap(() =>
              this.router.navigateByUrl(`/${signup.accountType.toLowerCase()}`)
            )
          )
      ),
      map(() => signupSuccessAction())
    ), { useEffectsErrorHandler: true }
  );

  deleteNotification$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteNotificationAction),
      exhaustMap(({ notification }) => {
        return this.httpClient.delete('/api/notifications/' + notification.id);
      }),
      map((notifications: Notification[]) => {
        return deleteNotificationSuccessAction({ notifications });
      })
    );
  }, { useEffectsErrorHandler: true });

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
        return this.httpClient.get<Notification[]>('/api/notifications/user');
      }),
      map((notifications) => {
        return getNotificationsSuccessAction({ notifications });
      })
    );
  }, { useEffectsErrorHandler: true });

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUserAction),
      switchMap(() => this.store.pipe(
        select(selectUserOrError),
        take(1)
      )),
      filter(user => !user),
      exhaustMap(() => this.httpClient.get<Signup>('/api/user').pipe(
        catchError(() => {
          this.store.dispatch(getUserErrorAction({ getUserError: 'error' }));
          return throwError('error');
        })
      )),
      map(user => getUserSuccessAction({ user }))
    ), { useEffectsErrorHandler: true }
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logoutAction),
      exhaustMap(() => this.httpClient.post<void>('/api/user/logout', null)),
      switchMap(() => this.router.navigateByUrl('/')),
      map(() => logoutSuccessAction())
    ), {useEffectsErrorHandler: true}
  );

  constructor(
    private actions$: Actions,
    private httpClient: HttpClient,
    private router: Router,
    private store: Store<AppState>,
    private notificationService: NotificationService
  ) {
  }
}
