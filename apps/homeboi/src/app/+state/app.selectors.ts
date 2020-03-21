import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './app.reducer';
import { Notification } from '@homeboi/api-interfaces';

const selectApp = createFeatureSelector('app');

export const selectUser = createSelector(
  selectApp,
  ({ user }: AppState) => user
);
export const selectUserId = createSelector(
  selectApp,
  ({ user }: AppState) => user?.userId
);
export const selectUserAccountType = createSelector(
  selectApp,
  ({ user }: AppState) => user?.accountType
);
export const selectProducts = createSelector(
  selectApp,
  ({ products }: AppState) => products
);
export const selectLoginError = createSelector(
  selectApp,
  ({ loginError }: AppState) => loginError
);
export const selectNotifications = createSelector(
  selectApp,
  ({notifications}: AppState): Notification[] | undefined => notifications
);
