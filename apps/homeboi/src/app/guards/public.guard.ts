import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, race } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AppState } from '../+state/app.reducer';
import { selectGetUserError, selectUser } from '../+state/app.selectors';
import { filter, map, take } from 'rxjs/operators';
import { Signup } from '@homeboi/api-interfaces';
import { accountUrlMap } from './account-url-map';
import { getUserAction } from '../+state/app.actions';

@Injectable({
  providedIn: 'root'
})
export class PublicGuard implements CanActivate {
  canActivate(): Observable<boolean | UrlTree> {
    this.store.dispatch(getUserAction());

    const user$: Observable<Signup> = this.store.pipe(
      select(selectUser),
      filter<Signup>(Boolean)
    );

    const getUserError$: Observable<string> = this.store.pipe(
      select(selectGetUserError),
      filter<string>(Boolean)
    );

    const userOrError$: Observable<Signup | string> = race(user$, getUserError$);

    return userOrError$.pipe(
      map(userOrError => this.navigate(userOrError)),
      take(1)
    )
  }

  constructor(private store: Store<AppState>, private router: Router) { }

  private navigate(userOrError: Signup | string): boolean | UrlTree {
    if (typeof userOrError === 'string') {
      return true;
    } else {
      return this.router.createUrlTree([accountUrlMap.get(userOrError.accountType)]);
    }
  }
}
