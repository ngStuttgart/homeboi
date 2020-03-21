import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import {
  getProductsSuccessAction,
  loginErrorAction,
  loginSuccessAction
} from './app.actions';
import { Product, Signup } from '@homeboi/api-interfaces';

export interface AppState {
  user?: Signup;
  products: Product[];
  loginError?: string;
}

export const initialAppState: AppState = {
  user: undefined,
  products: [],
  loginError: undefined
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
  )
);
