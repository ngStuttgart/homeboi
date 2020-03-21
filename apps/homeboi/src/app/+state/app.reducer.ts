import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { loginErrorAction, loginSuccessAction } from './app.actions';
import { Signup } from '@homeboi/api-interfaces';

export interface AppState {
  user?: Signup;
  loginError?: string;
}

export const initialAppState: AppState = {
  user: undefined,
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
    (state: AppState, {loginError}): AppState => ({
      ...state,
      loginError
    })
  )
);
