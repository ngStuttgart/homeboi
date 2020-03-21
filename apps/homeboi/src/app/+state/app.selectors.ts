import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './app.reducer';

const selectApp = createFeatureSelector('app');

export const selectUser = createSelector(selectApp, ({ user }: AppState) => user);
export const selectLoginError = createSelector(selectApp, ({loginError}: AppState) => loginError);
