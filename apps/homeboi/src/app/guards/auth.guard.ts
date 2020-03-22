import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { combineLatest, Observable, race } from 'rxjs';
import { AppState } from '../+state/app.reducer';
import { select, Store } from '@ngrx/store';
import { selectGetUserError, selectUser } from '../+state/app.selectors';
import { getUserAction } from '../+state/app.actions';
import { Signup } from '@homeboi/api-interfaces';
import { filter, map, take } from 'rxjs/operators';
import { RouterState, selectUrl } from '../+state/router.selectors';
import { accountUrlMap } from './account-url-map';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
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

    const url$: Observable<string> = this.store.pipe(
      select(selectUrl)
    );

    const userOrError$: Observable<Signup | string> = race(user$, getUserError$);

    return combineLatest([userOrError$, url$]).pipe(
      map(([userOrError, url]) => this.navigate(userOrError, url)),
      take(1)
    );
  }

  constructor(private store: Store<AppState & RouterState>, private router: Router) { }

  private navigate(userOrError: Signup | string, url: string): UrlTree | boolean {
    if (typeof userOrError === 'string') {
      return this.router.createUrlTree(['/']);
    } else {
      const urlForAccountType = accountUrlMap.get(userOrError.accountType);
      return url.startsWith(urlForAccountType) || this.router.createUrlTree([urlForAccountType]);
    }
  }
}
