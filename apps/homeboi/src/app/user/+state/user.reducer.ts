import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { Booking } from '@homeboi/api-interfaces';
import { getBookingsActionSuccess } from './user.actions';

export interface UserState {
  bookings?: Booking[];
}

export const initialUserState: UserState = {
  bookings: undefined
};

export function userReducer(state, action: Action) {
  return reducer(state, action);
}

const reducer: ActionReducer<UserState> = createReducer(
  initialUserState,
  on(getBookingsActionSuccess, (state, { bookings }): UserState => ({
    ...state,
    bookings
  }))
);
