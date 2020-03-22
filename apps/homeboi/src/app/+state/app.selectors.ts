import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './app.reducer';
import { Notification, Product, Signup } from '@homeboi/api-interfaces';

const selectApp = createFeatureSelector('app');

export const selectUser = createSelector(
  selectApp,
  ({ user }: AppState): Signup => user
);

export const selectUserId = createSelector(
  selectApp,
  ({ user }: AppState): string => user?.userId
);

export const selectUserAccountType = createSelector(
  selectApp,
  ({ user }: AppState) => user?.accountType
);

export const selectProducts = createSelector(
  selectApp,
  ({ products }: AppState): Product[] => products
);

export const selectLoginError = createSelector(
  selectApp,
  ({ loginError }: AppState): string => loginError
);

export const selectNotifications = createSelector(
  selectApp,
  ({notifications}: AppState): Notification[] | undefined => notifications
);

export const selectGetUserError = createSelector(
  selectApp,
  ({getUserError}: AppState): string | undefined => getUserError
);

export const selectUserOrError = createSelector(selectApp,
  ({ user, getUserError }: AppState): boolean => !!(user || getUserError)
);

export const selectSignupSubmitted = createSelector(
  selectApp,
  ({ signupSubmitted }: AppState): boolean => signupSubmitted
);

export const selectProductsLoading = createSelector(
  selectApp,
  ({prodcutsLoading}: AppState): boolean => prodcutsLoading
);
