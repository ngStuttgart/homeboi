import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import {
  getNotificationsSuccessAction,
  getProductsSuccessAction, getUserAction, getUserErrorAction, getUserSuccessAction,
  loginErrorAction,
  loginSuccessAction,
  resetNotificationsAction,
  setNotificationAction
} from './app.actions';
import { Notification, Product, Signup } from '@homeboi/api-interfaces';

export interface AppState {
  user?: Signup;
  products: Product[];
  loginError?: string;
  notifications?: Notification[];
  getUserError?: string;
}

export const initialAppState: AppState = {
  user: undefined,
  products: [],
  loginError: undefined,
  notifications: undefined,
  getUserError: undefined
};

export function appReducer(state: AppState, action: Action) {
  return reducer(state, action);
}

export const reducer: ActionReducer<AppState> = createReducer(
  initialAppState,
  on(
    loginSuccessAction,
    (state: AppState, { user }): AppState => ({
      ...state,
      getUserError: undefined,
      user
    })
  ),
  on(
    loginErrorAction,
    (state: AppState, { loginError }): AppState => ({
      ...state,
      loginError
    })
  ),
  on(
    getProductsSuccessAction,
    (state: AppState, { products }): AppState => ({
      ...state,
      products
    })
  ),
  on(
    setNotificationAction,
    (state: AppState, { notification }): AppState => ({
      ...state,
      notifications: [...(state.notifications || []), notification]
    })
  ),
  on(
    resetNotificationsAction,
    (state): AppState => ({
      ...state,
      notifications: undefined
    })
  ),
  on(
    getNotificationsSuccessAction,
    (state: AppState, { notifications }): AppState => ({
      ...state,
      notifications
    })
  ),
  on(
    getUserAction,
    (state): AppState => ({
      ...state
    })
  ),
  on(
    getUserSuccessAction,
    (state, {user}): AppState => ({
      ...state,
      getUserError: undefined,
      user
    })
  ),
  on(
    getUserErrorAction,
    (state, {getUserError}): AppState => ({
      ...state,
      user: undefined,
      getUserError
    })
  )
);
