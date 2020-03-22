import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

const selectUser = createFeatureSelector('user');

export const selectBookings = createSelector(
  selectUser,
  ({ bookings }: UserState) => bookings
);
