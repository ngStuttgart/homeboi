import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './app.reducer';

const selectApp = createFeatureSelector('app');

export const selectUser = createSelector(
  selectApp,
  ({ user }: AppState) => user
);
export const selectUserId = createSelector(
  selectApp,
  ({ user }: AppState) => user?.userId
);
export const selectProducts = createSelector(
  selectApp,
  ({ products }: AppState) => products
);
export const selectLoginError = createSelector(
  selectApp,
  ({ loginError }: AppState) => loginError
);
